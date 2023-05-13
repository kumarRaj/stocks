function isFresh(fileMetaData, ttl) {
    let ttlMs;
    if (ttl.endsWith('w')) {
        const weeksAgo = parseInt(ttl.slice(0, -1));
        ttlMs = 1000 * 60 * 60 * 24 * 7 * weeksAgo;
    } else if (ttl.endsWith('d')) {
        const daysAgo = parseInt(ttl.slice(0, -1));
        ttlMs = 1000 * 60 * 60 * 24 * daysAgo;
    } else {
        throw new Error('Invalid TTL format');
    }

    const now = new Date();
    const dateInPast = new Date(now.getTime() - ttlMs);
    return dateInPast.getTime() < fileMetaData.lastModified.getTime();
}

module.exports = {isFresh};
