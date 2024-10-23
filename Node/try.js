const url = 'http://localhost:3000/api.deps2.dev/v3/systems/npm/packages/express';

async function fetchPackageData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        let versions = [];
        if (data) {
            data.versions.map(v => {
                versions.push(v.versionKey.version);
            });
        }
        return versions;
    } catch (error) {
        console.error('Error fetching package data:', error);
    }
}

async function logVersions() {
    const versions = await fetchPackageData();
    versions.map(v => console.log(`${v},`));
}
logVersions();