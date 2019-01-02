
const socksUtils = require("./../src/socksUtils");

describe("Check Initial Socks Handshake", () => {

  test("should return true for no auth", () => {
    
    let buf = Buffer.from([0x05, 0x01, 0x00]);
    expect(socksUtils.checkIntialSocksChunk(buf)).toBe(true);
  });

  test("should return true for username/pass", () => {
    
    let buf = Buffer.from([0x05, 0x02, 0x00, 0x02]);
    expect(socksUtils.checkIntialSocksChunk(buf)).toBe(true);
  });

  test("should return false for Invalid Packet", () => {
    
    let buf = Buffer.from([0x05, 0x00]);
    expect(socksUtils.checkIntialSocksChunk(buf)).toBe(false);
  });
});
