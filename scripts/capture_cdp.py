import subprocess
import time
import json
import urllib.request
import asyncio
import base64
import os
import sys

async def send_cdp(ws_url, out_path, width=375, height=812, full_page=False):
    from urllib.parse import urlparse
    parsed = urlparse(ws_url)
    host = parsed.hostname
    port = parsed.port
    path = parsed.path

    reader, writer = await asyncio.open_connection(host, port)
    key = base64.b64encode(os.urandom(16)).decode('utf-8')
    handshake = (
        f"GET {path} HTTP/1.1\r\n"
        f"Host: {host}:{port}\r\n"
        f"Upgrade: websocket\r\n"
        f"Connection: Upgrade\r\n"
        f"Sec-WebSocket-Key: {key}\r\n"
        f"Sec-WebSocket-Version: 13\r\n\r\n"
    )
    writer.write(handshake.encode())
    await writer.drain()

    resp = b""
    while b"\r\n\r\n" not in resp:
        chunk = await reader.read(1024)
        resp += chunk

    async def send_msg(payload):
        data = json.dumps(payload).encode('utf-8')
        length = len(data)
        frame = bytearray([0x81])
        if length < 126:
            frame.append(0x80 | length)
        elif length < 65536:
            frame.append(0x80 | 126)
            frame.extend(length.to_bytes(2, 'big'))
        else:
            frame.append(0x80 | 127)
            frame.extend(length.to_bytes(8, 'big'))
        mask = os.urandom(4)
        frame.extend(mask)
        masked_data = bytes([b ^ mask[i % 4] for i, b in enumerate(data)])
        frame.extend(masked_data)
        writer.write(frame)
        await writer.drain()

    async def read_msg():
        while True:
            head = await reader.readexactly(2)
            b2 = head[1]
            length = b2 & 0x7f
            if length == 126:
                length = int.from_bytes(await reader.readexactly(2), 'big')
            elif length == 127:
                length = int.from_bytes(await reader.readexactly(8), 'big')
            payload = await reader.readexactly(length)
            return json.loads(payload.decode('utf-8'))

    # Set device metrics
    await send_msg({
        "id": 1,
        "method": "Emulation.setDeviceMetricsOverride",
        "params": {
            "width": width,
            "height": height,
            "deviceScaleFactor": 2,
            "mobile": (width < 768)
        }
    })
    await read_msg()
    await asyncio.sleep(1)

    params = {"format": "png"}
    if full_page:
        params["captureBeyondViewport"] = True

    await send_msg({
        "id": 2,
        "method": "Page.captureScreenshot",
        "params": params
    })
    res = await read_msg()
    img_data = base64.b64decode(res['result']['data'])
    with open(out_path, 'wb') as f:
        f.write(img_data)
    print(f"Saved {out_path} ({len(img_data)} bytes)")

    writer.close()
    await writer.wait_closed()

def capture(url, out_path, width=375, height=812, full_page=False):
    chrome_proc = subprocess.Popen([
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '--headless=new',
        '--remote-debugging-port=9222',
        '--disable-gpu',
        url
    ])
    time.sleep(2)
    try:
        req = urllib.request.urlopen('http://localhost:9222/json')
        targets = json.loads(req.read().decode())
        page_target = next((t for t in targets if t.get('type') == 'page'), targets[0])
        ws_url = page_target['webSocketDebuggerUrl']
        asyncio.run(send_cdp(ws_url, out_path, width, height, full_page))
    finally:
        chrome_proc.terminate()

if __name__ == '__main__':
    url = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:3000/'
    out = sys.argv[2] if len(sys.argv) > 2 else '/tmp/test.png'
    w = int(sys.argv[3]) if len(sys.argv) > 3 else 375
    h = int(sys.argv[4]) if len(sys.argv) > 4 else 812
    capture(url, out, w, h)
