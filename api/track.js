/**
 * api/track.js
 * Serverless function to log Telegram Datacenter IPs for Link Previews.
 * Works on Vercel, Netlify, or as a standalone Node.js endpoint.
 */

export default async function handler(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // 1. Log the hit
    console.log(`[Telegram Preview Hit]: IP=${ip}, UA=${userAgent}`);

    // 2. Optional: Log to a real database (like Supabase) here
    // await supabase.from('logs').insert([{ ip, user_agent: userAgent, source: 'Preview' }]);

    // 3. Set cache control so Telegram doesn't cache the unique URL too long
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    // 4. Return a 1x1 transparent GIF or redirect to a real image
    // For this demo, we'll redirect to a beautiful placeholder image
    res.redirect(302, 'https://picsum.photos/seed/antimirror/1200/630');
}
