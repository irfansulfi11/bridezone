// Image URL helpers.
//
// Primary images come from Unsplash (themed wedding / jewellery / food photos).
// SmartImage falls back to a deterministic picsum seed if an Unsplash photo
// fails, and finally to an on-brand CSS gradient if the network is unavailable.
// On the deployed Vercel site the browser loads these directly — no proxy — so
// the real photos show. (No backend, no keys, no env vars.)

export const unsplash = (id: string, w = 900, h = 700): string =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=72`

export const picsum = (seed: string, w = 900, h = 700): string =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`

// Curated Unsplash photo-id pools by theme. Reused across the dummy data.
export const PHOTOS = {
  couple: [
    '1519741497674-611481863552',
    '1583939003579-730e3918a45a',
    '1606216794074-735e91aa2c92',
    '1537633552985-df8429e8048b',
    '1600880292203-757bb62b4baf',
  ],
  decor: [
    '1519225421980-715cb0215aed',
    '1464366400600-7168b8af9bc3',
    '1470229722913-7c0e2dbbafd3',
    '1478146896981-b80fe463b330',
  ],
  food: [
    '1555939594-58d7cb561ad1',
    '1414235077428-338989a2e8c0',
    '1517248135467-4c7edcad34c4',
    '1476224203421-9ac39bcb3327',
  ],
  makeup: [
    '1487412720507-e7ab37603c6f',
    '1522337660859-02fbefca4702',
    '1560066984-138dadb4c035',
    '1503104834685-7205e8607eb9',
  ],
  venue: [
    '1519167758481-83f550bb49b3',
    '1505236858219-8359eb29e329',
    '1571896349842-33c89424de2d',
    '1542314831-068cd1dbfeeb',
  ],
  music: [
    '1514320291840-2e0a9bf2a9ae',
    '1516450360452-9312f5e86fc7',
    '1470019693664-1d202d2c0907',
    '1493225457124-a3eb161ffa5f',
  ],
  jewellery: [
    '1611591437281-460bfbe1220a',
    '1599643478518-a784e5dc4c8f',
    '1602751584552-8ba73aad10e1',
    '1617038220319-276d3cfab638',
    '1535632066927-ab7c9ab60908',
    '1573408301185-9146fe634ad0',
  ],
  bride: [
    '1595777457583-95e059d581b8',
    '1583939411023-14783179e581',
    '1594552072238-b8a33785b261',
    '1596436889106-be35e843f974',
    '1610030469983-98e550d6193c',
  ],
  groom: [
    '1594938298603-c8148c4dae35',
    '1507003211169-0a1dd7228f2d',
    '1521572163474-6864f9cf17ab',
    '1592878940526-0214b0f374f6',
  ],
  mehndi: [
    '1610030469983-98e550d6193c',
    '1600950207944-0d63e8edbc3f',
    '1595777457583-95e059d581b8',
    '1583939411023-14783179e581',
  ],
  invite: [
    '1607190074257-dd4b7af0309f',
    '1513151233558-d860c5398176',
    '1550005809-91ad75fb315f',
    '1526047932273-341f2a7631f9',
  ],
} as const

/** Hero / banner sized helper — wide crop. */
export const hero = (id: string, w = 1920, h = 900): string => unsplash(id, w, h)
