// npm i express 
const express = require('express');
const app = express();
const PORT = 3000; 
const epicPackageData = {
    versions: [
        {
            versionKey: {
                system: "NPM",
                name: "epic",
                version: "0.0.1"
            },
            publishedAt: "2022-01-01T10:00:00Z",
            isDefault: false
        },
        {
            versionKey: {
                system: "NPM",
                name: "epic",
                version: "0.0.2"
            },
            publishedAt: "2022-06-15T10:00:00Z",
            isDefault: false
        },
        {
            versionKey: {
                system: "NPM",
                name: "epic",
                version: "0.1.0. 0.1.0"
            },
            publishedAt: "2023-03-20T10:00:00Z",
            isDefault: true
        }
    ]
};
app.get('/api.deps2.dev/v3/systems/npm/packages/express', (req, res) => {
    res.json(epicPackageData);
});
app.listen(PORT, () => {
    console.log(`deps2.dev server is running at http://localhost:${PORT}`);
});
