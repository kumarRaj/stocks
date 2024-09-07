function hasLatestData(fileMetaData, ttl) {
    if (fileMetaData.size == 0){
        return false
    }
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


async function fetchJsonWithTimeout(url, options = {}, timeout = 50000) {
    const controller = new AbortController();
    const { signal } = controller;
    options.signal = signal;

    // Create a timeout promise that will abort the fetch if it exceeds the time limit
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, options);
        clearTimeout(timeoutId); // Clear the timeout if the request succeeds

        // Check if the response status is OK (200-299) before proceeding
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        // Check if the response is JSON
        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            throw new Error("Expected JSON, but received a non-JSON response");
        }

        return response;
    } catch (err) {
        if (err.name === 'AbortError') {
            console.error(`Fetch request timed out after ${timeout} ms`);
        } else {
            console.error(`Fetch request failed: ${err.message}`);
        }
        throw err;
    }
}

async function fetchWithTimeout(url, options = {}, timeout = 50000) {
    const controller = new AbortController();
    const { signal } = controller;
    options.signal = signal;

    // Create a timeout promise that will abort the fetch if it exceeds the time limit
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, options);
        clearTimeout(timeoutId); // Clear the timeout if the request succeeds
        return response;
    } catch (err) {
        if (err.name === 'AbortError') {
            console.error(`Fetch request timed out after ${timeout} ms`);
        } else {
            console.error(`Fetch request failed: ${err.message}`);
        }
        throw err;
    }
}


module.exports = {isFresh: hasLatestData, fetchWithTimeout, fetchJsonWithTimeout};
