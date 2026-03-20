
const entryForm = document.getElementById('entryForm');

if (entryForm) {
    entryForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const date = document.getElementById('date').value;
        const category = document.getElementById('category').value;
        const notes = document.getElementById('notes').value;
        console.log(category)
        try {
            const res = await fetch('https://personal-diary-fuwn.onrender.com/diary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category, notes, date })
            });

            if (res.ok) {
                alert('Entry added successfully!');
                entryForm.reset();
            } else {
                const data = await res.json();
                alert('Error: ' + (data.error || 'Could not add entry.'));
            }
        } catch (err) {
            console.error(err);
            alert('Network error.');
        }
    });
}

const entriesList = document.getElementById('entriesList');
const applyFiltersBtn = document.getElementById('applyFilters');

if (entriesList && applyFiltersBtn) {
    let allEntries = [];

    const fetchEntries = async () => {
        try {
            const res = await fetch('https://personal-diary-fuwn.onrender.com/diary');
            allEntries = await res.json();
            renderEntries(allEntries);
        } catch (err) {
            console.error(err);
            entriesList.innerHTML = '<p>Error fetching entries.</p>';
        }
    };

    fetchEntries();

    const renderEntries = (entries) => {
        if (entries.length === 0) {
            entriesList.innerHTML = '<p>No entries found.</p>';
            return;
        }

        entriesList.innerHTML = '';
        entries.forEach(entry => {
            const div = document.createElement('div');
            div.classList.add('entry-card');
            div.innerHTML = `
                <strong>${new Date(entry.date).toLocaleString()}</strong><br/>
                <em>${entry.category}</em><br/>
                <p>${entry.notes}</p>
            `;
            entriesList.appendChild(div);
        });
    };

    applyFiltersBtn.addEventListener('click', () => {
        const searchText = document.getElementById('searchInput').value.toLowerCase();
        const category = document.getElementById('categoryFilter').value;
        const date = document.getElementById('dateFilter').value;
        const sortOrder = document.getElementById('sortSelect').value;

        let filtered = allEntries;

        if (searchText) {
            filtered = filtered.filter(e => e.notes.toLowerCase().includes(searchText));
        }
        if (category) {
            filtered = filtered.filter(e => e.category === category);
        }
        if (date) {
            filtered = filtered.filter(e => e.date.startsWith(date)); // YYYY-MM-DD
        }

        filtered.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        renderEntries(filtered);
    });
}