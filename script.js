// Intelligent Search - Main Application
// DOM Elements
const searchInput = document.getElementById('searchInput');
const autocompleteList = document.getElementById('autocompleteList');
const spellCheck = document.getElementById('spellCheck');
const resultsContainer = document.getElementById('results');
const clearBtn = document.getElementById('clearBtn');
const recentList = document.getElementById('recentList');
const clearRecentBtn = document.getElementById('clearRecentBtn');
const voiceBtn = document.getElementById('voiceBtn');
const searchStats = document.getElementById('searchStats');
const resultCount = document.getElementById('resultCount');
const searchTime = document.getElementById('searchTime');
const filterTags = document.querySelectorAll('.filter-tag');
const exampleQueries = document.querySelectorAll('.example-queries span');

// State
let recentSearches = JSON.parse(localStorage.getItem('intelligentSearch_recent')) || [];
let currentSuggestions = [];
let currentFilter = 'all';
let isRecording = false;
let recognition = null;

// Initialize Speech Recognition
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onresult = function(event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        searchInput.value = transcript;
        handleInput();
        stopRecording();
    };
    
    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        stopRecording();
    };
    
    recognition.onend = function() {
        stopRecording();
    };
}

// Initialize
function init() {
    loadRecentSearches();
    setupEventListeners();
    updateResultsCount(0);
}

// Setup Event Listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleInput);
    searchInput.addEventListener('keydown', handleKeydown);
    searchInput.addEventListener('focus', handleFocus);
    clearBtn.addEventListener('click', clearSearch);
    clearRecentBtn.addEventListener('click', clearAllRecent);
    voiceBtn.addEventListener('click', toggleVoiceSearch);
    document.addEventListener('click', closeAutocomplete);
    
    // Filter tags
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            currentFilter = tag.dataset.filter;
            if (searchInput.value.trim()) {
                performSearch(searchInput.value.trim());
            }
        });
    });
    
    // Example queries
    exampleQueries.forEach(query => {
        query.addEventListener('click', () => {
            const text = query.textContent.replace(/"/g, '').trim();
            searchInput.value = text;
            performSearch(text);
            addToRecent(text);
            closeAutocomplete();
        });
    });
}

// Handle Input
function handleInput() {
    const query = searchInput.value.trim();
    
    // Toggle clear button
    clearBtn.classList.toggle('visible', query.length > 0);
    
    if (query.length === 0) {
        clearResults();
        closeAutocomplete();
        hideSpellCheck();
        updateResultsCount(0);
        searchStats.classList.remove('visible');
        return;
    }
    
    // Get autocomplete suggestions
    const suggestions = getAutocompleteSuggestions(query);
    showAutocomplete(suggestions, query);
    
    // Check spelling
    checkSpelling(query);
    
    // Perform search with current filter
    performSearch(query);
}

// Handle Focus
function handleFocus() {
    if (searchInput.value.trim().length === 0) {
        const recent = getRecentSearches();
        if (recent.length > 0) {
            showAutocomplete(recent, '');
        }
    }
}

// Get Autocomplete Suggestions
function getAutocompleteSuggestions(query) {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return getRecentSearches().slice(0, 5);
    
    const suggestions = new Set();
    
    // Search in data titles
    searchData.forEach(item => {
        if (item.title.toLowerCase().includes(lowerQuery)) {
            suggestions.add(item.title);
        }
    });
    
    // Search in content
    searchData.forEach(item => {
        if (item.content.toLowerCase().includes(lowerQuery)) {
            const words = item.content.split(' ');
            words.forEach(word => {
                if (word.toLowerCase().startsWith(lowerQuery) && 
                    word.length > 2 &&
                    !suggestions.has(word) &&
                    !Array.from(suggestions).some(s => s.toLowerCase() === word.toLowerCase())) {
                    suggestions.add(word);
                }
            });
        }
    });
    
    // Add from autocomplete words
    autocompleteWords.forEach(word => {
        if (word.toLowerCase().startsWith(lowerQuery) && 
            !suggestions.has(word) &&
            !Array.from(suggestions).some(s => s.toLowerCase() === word.toLowerCase())) {
            suggestions.add(word);
        }
    });
    
    // Add recent searches that match
    getRecentSearches().forEach(search => {
        if (search.toLowerCase().includes(lowerQuery) && 
            !suggestions.has(search) &&
            !Array.from(suggestions).some(s => s.toLowerCase() === search.toLowerCase())) {
            suggestions.add(search);
        }
    });
    
    return Array.from(suggestions).slice(0, 8);
}

// Show Autocomplete
function showAutocomplete(suggestions, query) {
    if (!suggestions || suggestions.length === 0) {
        closeAutocomplete();
        return;
    }
    
    currentSuggestions = suggestions;
    autocompleteList.innerHTML = '';
    
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-search';
        
        const text = document.createElement('span');
        // Highlight matching text
        const lowerSuggestion = suggestion.toLowerCase();
        const lowerQuery = query.toLowerCase().trim();
        
        if (lowerQuery && lowerSuggestion.includes(lowerQuery)) {
            const index = lowerSuggestion.indexOf(lowerQuery);
            text.innerHTML = 
                suggestion.substring(0, index) + 
                `<span class="highlight">${suggestion.substring(index, index + query.length)}</span>` + 
                suggestion.substring(index + query.length);
        } else {
            text.textContent = suggestion;
        }
        
        const type = document.createElement('span');
        type.className = 'suggestion-type';
        if (searchData.some(item => item.title === suggestion)) {
            type.textContent = 'Topic';
        } else if (getRecentSearches().includes(suggestion)) {
            type.textContent = 'Recent';
        } else {
            type.textContent = 'Suggestion';
        }
        
        div.appendChild(icon);
        div.appendChild(text);
        div.appendChild(type);
        div.addEventListener('click', () => selectSuggestion(suggestion));
        div.addEventListener('mouseenter', () => {
            document.querySelectorAll('.autocomplete-item').forEach(item => 
                item.classList.remove('active-item')
            );
            div.classList.add('active-item');
        });
        
        autocompleteList.appendChild(div);
    });
    
    autocompleteList.classList.add('active');
}

// Close Autocomplete
function closeAutocomplete() {
    autocompleteList.classList.remove('active');
    autocompleteList.innerHTML = '';
}

// Select Suggestion
function selectSuggestion(suggestion) {
    searchInput.value = suggestion;
    closeAutocomplete();
    performSearch(suggestion);
    addToRecent(suggestion);
    searchInput.focus();
}

// Handle Keydown
function handleKeydown(e) {
    const items = autocompleteList.querySelectorAll('.autocomplete-item');
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (items.length > 0) {
            const currentIndex = Array.from(items).findIndex(item => item.classList.contains('active-item'));
            const nextIndex = (currentIndex + 1) % items.length;
            items.forEach((item, index) => {
                item.classList.toggle('active-item', index === nextIndex);
            });
            items[nextIndex]?.scrollIntoView({ block: 'nearest' });
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (items.length > 0) {
            const currentIndex = Array.from(items).findIndex(item => item.classList.contains('active-item'));
            const prevIndex = currentIndex === -1 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length;
            items.forEach((item, index) => {
                item.classList.toggle('active-item', index === prevIndex);
            });
            items[prevIndex]?.scrollIntoView({ block: 'nearest' });
        }
    } else if (e.key === 'Enter') {
        const activeItem = autocompleteList.querySelector('.active-item');
        if (activeItem) {
            const text = activeItem.querySelector('span').textContent;
            selectSuggestion(text);
        } else if (searchInput.value.trim()) {
            performSearch(searchInput.value.trim());
            addToRecent(searchInput.value.trim());
            closeAutocomplete();
        }
    } else if (e.key === 'Escape') {
        closeAutocomplete();
        searchInput.blur();
    }
}

// Check Spelling
function checkSpelling(query) {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) {
        hideSpellCheck();
        return;
    }
    
    let suggestion = null;
    
    // Check exact match in misspellings dictionary
    if (commonMisspellings[lowerQuery]) {
        suggestion = commonMisspellings[lowerQuery];
    } else {
        // Check for similar words using Levenshtein distance
        const words = lowerQuery.split(' ');
        const lastWord = words[words.length - 1];
        
        for (const [misspelled, correct] of Object.entries(commonMisspellings)) {
            if (levenshteinDistance(lastWord, misspelled) <= 2 && lastWord !== correct) {
                const correctedQuery = words.slice(0, -1).concat([correct]).join(' ');
                suggestion = correctedQuery;
                break;
            }
        }
    }
    
    if (suggestion && suggestion !== lowerQuery) {
        showSpellCheck(query, suggestion);
    } else {
        hideSpellCheck();
    }
}

// Levenshtein Distance
function levenshteinDistance(str1, str2) {
    if (str1.length === 0) return str2.length;
    if (str2.length === 0) return str1.length;
    
    const matrix = Array(str2.length + 1).fill(null).map(() => 
        Array(str1.length + 1).fill(null)
    );
    
    for (let i = 0; i <= str1.length; i++) {
        matrix[0][i] = i;
    }
    
    for (let j = 0; j <= str2.length; j++) {
        matrix[j][0] = j;
    }
    
    for (let j = 1; j <= str2.length; j++) {
        for (let i = 1; i <= str1.length; i++) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1,
                matrix[j - 1][i] + 1,
                matrix[j - 1][i - 1] + indicator
            );
        }
    }
    
    return matrix[str2.length][str1.length];
}

// Show Spell Check
function showSpellCheck(query, suggestion) {
    spellCheck.innerHTML = `
        <div class="suggestion-text">
            <i class="fas fa-spell-check"></i>
            Did you mean: 
            <span class="suggestion-link" onclick="selectSuggestion('${suggestion.replace(/'/g, "\\'")}')">
                "${suggestion}"
            </span>
            <span style="color: rgba(255,255,255,0.3); margin-left: 8px; font-size: 0.8rem;">
                (Showing results for "${suggestion}")
            </span>
        </div>
    `;
    spellCheck.classList.add('active');
}

// Hide Spell Check
function hideSpellCheck() {
    spellCheck.classList.remove('active');
}

// Perform Search
function performSearch(query) {
    const startTime = performance.now();
    const lowerQuery = query.toLowerCase().trim();
    
    // Search in data
    let results = searchData.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) ||
        item.content.toLowerCase().includes(lowerQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        item.author.toLowerCase().includes(lowerQuery)
    );
    
    // Apply category filter
    if (currentFilter !== 'all') {
        results = results.filter(item => item.category === currentFilter);
    }
    
    // Sort results by relevance (title matches first)
    results.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(lowerQuery) ? 2 : 0;
        const bTitle = b.title.toLowerCase().includes(lowerQuery) ? 2 : 0;
        const aTag = a.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ? 1 : 0;
        const bTag = b.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ? 1 : 0;
        return (bTitle + bTag) - (aTitle + aTag);
    });
    
    const endTime = performance.now();
    displayResults(results, query, endTime - startTime);
}

// Display Results with Rich Content
function displayResults(results, query, time) {
    searchStats.classList.add('visible');
    updateResultsCount(results.length);
    
    if (time) {
        searchTime.textContent = `• ${time.toFixed(0)}ms`;
    }
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>No results found for "${query}"</h3>
                <p>Try adjusting your search terms or check your spelling.</p>
                <div class="suggested-queries">
                    <span>Suggestions:</span>
                    <span onclick="selectSuggestion('JavaScript')">JavaScript</span>
                    <span onclick="selectSuggestion('Python')">Python</span>
                    <span onclick="selectSuggestion('React')">React</span>
                    <span onclick="selectSuggestion('Data Science')">Data Science</span>
                </div>
            </div>
        `;
        return;
    }
    
    const categoryColors = {
        tech: '#667eea',
        ai: '#2ed573',
        design: '#ffa502',
        business: '#ff6b81'
    };
    
    const categoryLabels = {
        tech: 'Technology',
        ai: 'Artificial Intelligence',
        design: 'Design',
        business: 'Business'
    };
    
    resultsContainer.innerHTML = results.map((item, index) => `
        <div class="result-item" style="animation-delay: ${index * 0.05}s">
            <div class="result-header">
                <div class="result-left">
                    <span class="result-number">#${index + 1}</span>
                    <span class="result-category" style="background: ${categoryColors[item.category] || '#667eea'}20; color: ${categoryColors[item.category] || '#667eea'}">
                        <i class="${item.icon || 'fa-solid fa-file'}"></i>
                        ${categoryLabels[item.category] || item.category}
                    </span>
                    <span class="result-author">
                        <i class="fas fa-user"></i> ${item.author || 'Unknown'}
                    </span>
                </div>
                <div class="result-right">
                    <span class="result-date">
                        <i class="fas fa-calendar"></i> ${item.date || 'N/A'}
                    </span>
                    <span class="result-readtime">
                        <i class="fas fa-clock"></i> ${item.readTime || '5 min'}
                    </span>
                </div>
            </div>
            <h3>
                <i class="${item.icon || 'fa-solid fa-file'}"></i>
                ${item.title}
            </h3>
            <p>${highlightText(item.content, query)}</p>
            <div class="result-tags">
                ${item.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Highlight text in results
function highlightText(text, query) {
    const words = query.toLowerCase().split(' ');
    let highlighted = text;
    words.forEach(word => {
        if (word.length > 2) {
            const regex = new RegExp(`(${word})`, 'gi');
            highlighted = highlighted.replace(regex, '<span class="highlight-text">$1</span>');
        }
    });
    return highlighted;
}

// Update Results Count
function updateResultsCount(count) {
    resultCount.textContent = count;
}

// Clear Results
function clearResults() {
    resultsContainer.innerHTML = `
        <div class="welcome-message">
            <div class="welcome-icon">
                <i class="fas fa-robot"></i>
            </div>
            <h2>Welcome to Intelligent Search</h2>
            <p>Ask me anything, and I'll find the most relevant information for you.</p>
            <div class="example-queries">
                <span>Try: "JavaScript"</span>
                <span>"Data Science"</span>
                <span>"Web Development"</span>
            </div>
        </div>
    `;
    searchStats.classList.remove('visible');
}

// Clear Search
function clearSearch() {
    searchInput.value = '';
    clearResults();
    closeAutocomplete();
    hideSpellCheck();
    clearBtn.classList.remove('visible');
    updateResultsCount(0);
    searchInput.focus();
}

// Add to Recent Searches
function addToRecent(query) {
    if (!query || query.trim().length === 0) return;
    query = query.trim();
    
    // Remove duplicate if exists
    recentSearches = recentSearches.filter(item => item.toLowerCase() !== query.toLowerCase());
    
    // Add to beginning
    recentSearches.unshift(query);
    
    // Limit to 10
    if (recentSearches.length > 10) {
        recentSearches.pop();
    }
    
    // Save to localStorage
    localStorage.setItem('intelligentSearch_recent', JSON.stringify(recentSearches));
    
    // Update UI
    loadRecentSearches();
}

// Get Recent Searches
function getRecentSearches() {
    return recentSearches;
}

// Load Recent Searches
function loadRecentSearches() {
    if (recentSear