import React, { useState } from 'react';
import axios from 'axios';

const ImageSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const response = await axios.get(`http://localhost:3000/search?query=${searchQuery}`);
        setResults(response.data);
    };

    return (
        <div>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search images..." />
            <button onClick={handleSearch}>Search</button>
            <div>
                {results.map((image) => (
                    <img key={image._id} src={image.url} alt={image.description} />
                ))}
            </div>
        </div>
    );
};

export default ImageSearch;
