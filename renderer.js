// ==================== INIZIALIZZAZIONE ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 River - Inizializzazione applicazione');
    
    // Inizializza l'app
    initializeApp();
});

function initializeApp() {
    // Carica tutte le impostazioni salvate
    loadAllSavedSettings();
    
    // Carica dati utente
    loadUserData();
    
    // Setup navigazione
    setupNavigation();
    
    // Carica home page
    loadHomeSection();
}

// ==================== GESTIONE UTENTE ====================

function loadUserData() {
    try {
        const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const userNameElement = document.getElementById('userName');
        const userStatusElement = document.getElementById('userStatus');
        const userAvatarElement = document.getElementById('userAvatar');
        
        if (userNameElement && userData.username) {
            userNameElement.textContent = userData.username;
        }
        
        if (userStatusElement) {
            userStatusElement.textContent = getStatusText(userData.status || 'online');
            userStatusElement.className = `status ${userData.status || 'online'}`;
        }
        
        if (userAvatarElement) {
            userAvatarElement.src = userData.avatar || getDefaultAvatar();
        }
    } catch (error) {
        console.error('❌ Errore caricamento dati utente:', error);
    }
}

function getStatusText(status) {
    const statusMap = {
        'online': '🟢 Online',
        'busy': '🟡 Occupato',
        'away': '🟠 Assente',
        'invisible': '⚫ Invisibile',
        'ai-session': '🔵 In Sessione AI',
        'creating': '🟣 Creazione in Corso',
        'logout': '🔴 Logout'
    };
    return statusMap[status] || '🟢 Online';
}

function getDefaultAvatar() {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMzMzQxNTUiLz4KPC9zdmc+';
}

// ==================== GESTIONE IMPOSTAZIONI ====================

function loadAllSavedSettings() {
    try {
        const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
        console.log('🎨 Impostazioni caricate:', settings);
        
        // Applica tutte le impostazioni salvate
        if (settings.quickColors) {
            applyQuickColorTheme(settings.quickColors, false);
        }
        if (settings.gradient) {
            applyGradientTheme(settings.gradient, false);
        }
        if (settings.lighting) {
            applyLightingSettings(settings.lighting, false);
        }
        if (settings.transparency) {
            applyTransparencySettings(settings.transparency, false);
        }
        if (settings.font) {
            applyFontSettings(settings.font, false);
        }
        if (settings.background) {
            applyBackgroundSettings(settings.background, false);
        }
    } catch (error) {
        console.error('❌ Errore caricamento impostazioni:', error);
    }
}

// ==================== NAVIGAZIONE PRINCIPALE ====================

function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            console.log('📍 Navigazione a:', section);
            
            // Aggiorna bottoni attivi
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Carica sezione
            loadSection(section);
        });
    });
}

function loadSection(section) {
    console.log('📂 Caricamento sezione:', section);
    
    switch(section) {
        case 'home':
            loadHomeSection();
            break;
        case 'profile':
            loadProfileSection();
            break;
        case 'settings':
            loadSettingsSection();
            break;
        default:
            loadHomeSection();
    }
}

// ==================== SEZIONE HOME ====================

function loadHomeSection() {
    const mainContent = document.getElementById('mainContent');
    const subNavbar = document.getElementById('subNavbar');
    
    // Nascondi sub-navbar
    if (subNavbar) {
        subNavbar.classList.remove('active');
        subNavbar.innerHTML = '';
    }
    
    // Carica contenuto home
    if (mainContent) {
        const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        mainContent.innerHTML = `
            <div class="home-content">
                <h1>Benvenuto in River, <span>${userData.username || 'Utente'}</span>!</h1>
                <p>Il tuo centro di controllo personale per la vita digitale. Gestisci, analizza e crea con l'AI.</p>
                
                <div style="margin-top: 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    <div class="profile-section">
                        <h3>🚀 Stato Sistema</h3>
                        <p>Tutte le funzionalità operative</p>
                        <div style="color: #10b981; font-weight: bold;">✓ Sistema pronto</div>
                    </div>
                    
                    <div class="profile-section">
                        <h3>🎨 Personalizzazione</h3>
                        <p>Interfaccia completamente personalizzabile</p>
                        <div style="color: #3b82f6; font-weight: bold;">✓ Temi attivi</div>
                    </div>
                </div>
            </div>
        `;
    }
}

// ==================== SEZIONE PROFILO ====================

function loadProfileSection() {
    const mainContent = document.getElementById('mainContent');
    const subNavbar = document.getElementById('subNavbar');
    
    if (!mainContent) return;
    
    // Mostra sub-navbar profilo
    if (subNavbar) {
        subNavbar.classList.add('active');
        subNavbar.innerHTML = `
            <div class="sub-nav-buttons">
                <button class="sub-nav-btn active" onclick="loadProfileContent('main')">Il Mio Profilo</button>
                <button class="sub-nav-btn" onclick="loadProfileContent('info')">Informazioni Personali</button>
            </div>
        `;
    }
    
    // Carica contenuto profilo principale
    loadProfileContent('main');
}

function loadProfileContent(subsection) {
    const mainContent = document.getElementById('mainContent');
    const userData = JSON.parse(localStorage.getItem('userProfile') || localStorage.getItem('currentUser') || '{}');
    
    if (!mainContent) return;
    
    if (subsection === 'main') {
        mainContent.innerHTML = `
            <div class="profile-content">
                <h2>👤 Il Mio Profilo</h2>
                
                <div class="profile-section">
                    <h3>🖼️ Avatar</h3>
                    <div class="avatar-options">
                        <div class="current-avatar">
                            <img id="currentAvatarImg" src="${userData.avatar || getDefaultAvatar()}" alt="Avatar" class="profile-avatar">
                        </div>
                        <div class="avatar-actions">
                            <button class="action-btn" onclick="handleAvatarUpload()">📁 Carica Foto</button>
                            <button class="action-btn" onclick="showAvatarPicker()">🎨 Scegli Avatar Predefinito</button>
                            <button class="action-btn danger" onclick="deleteAvatar()">🗑️ Elimina Avatar</button>
                        </div>
                    </div>
                </div>

                <div class="profile-section">
                    <h3>📝 Informazioni Personali</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>👤 Nome</label>
                            <input type="text" id="profileName" value="${userData.username || ''}" placeholder="Inserisci il tuo nome">
                        </div>
                        <div class="info-item">
                            <label>💬 Nickname</label>
                            <input type="text" id="profileNickname" value="${userData.nickname || userData.username || ''}" placeholder="Come vuoi essere chiamato">
                        </div>
                        <div class="info-item">
                            <label>📧 Email</label>
                            <input type="email" id="profileEmail" value="${userData.email || ''}" placeholder="la.tua@email.com">
                        </div>
                        <div class="info-item">
                            <label>📖 Biografia</label>
                            <textarea id="profileBio" placeholder="Raccontaci qualcosa di te...">${userData.bio || ''}</textarea>
                        </div>
                    </div>
                </div>

                <div class="profile-section">
                    <h3>🔔 Stato</h3>
                    <select id="profileStatus" class="status-select">
                        <option value="online" ${userData.status === 'online' ? 'selected' : ''}>🟢 Online</option>
                        <option value="busy" ${userData.status === 'busy' ? 'selected' : ''}>🟡 Occupato</option>
                        <option value="away" ${userData.status === 'away' ? 'selected' : ''}>🟠 Assente</option>
                        <option value="invisible" ${userData.status === 'invisible' ? 'selected' : ''}>⚫ Invisibile</option>
                        <option value="ai-session" ${userData.status === 'ai-session' ? 'selected' : ''}>🔵 In Sessione AI</option>
                        <option value="creating" ${userData.status === 'creating' ? 'selected' : ''}>🟣 Creazione in Corso</option>
                        <option value="logout" ${userData.status === 'logout' ? 'selected' : ''}>🔴 Logout</option>
                    </select>
                </div>

                <div class="profile-section">
                    <h3>⚧️ Genere</h3>
                    <select id="profileGender" class="gender-select">
                        <option value="">🤐 Preferisco non dirlo</option>
                        <option value="uomo" ${userData.gender === 'uomo' ? 'selected' : ''}>👨 Uomo</option>
                        <option value="donna" ${userData.gender === 'donna' ? 'selected' : ''}>👩 Donna</option>
                        <option value="trans" ${userData.gender === 'trans' ? 'selected' : ''}>⚧️ Trans</option>
                        <option value="non-binario" ${userData.gender === 'non-binario' ? 'selected' : ''}>⚪ Non Binario</option>
                    </select>
                </div>

                <button class="save-btn" onclick="saveProfileData()">💾 Salva Modifiche</button>
            </div>
        `;

        // Setup event listeners per salvataggio automatico
        setupProfileInputListeners();
    } else if (subsection === 'info') {
        mainContent.innerHTML = `
            <div class="profile-content">
                <h2>📊 Informazioni Account</h2>
                <div class="profile-section">
                    <h3>📈 Statistiche</h3>
                    <p>Qui verranno mostrate le statistiche del tuo account</p>
                    <div style="background: var(--card-color); padding: 20px; border-radius: 10px; margin-top: 15px;">
                        <p>🎯 Funzionalità in sviluppo</p>
                    </div>
                </div>
            </div>
        `;
    }
}

function setupProfileInputListeners() {
    // Salva automaticamente quando si preme Enter
    const inputIds = ['profileName', 'profileNickname', 'profileEmail', 'profileBio'];
    
    inputIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    saveProfileData();
                }
            });
        }
    });
}

function saveProfileData() {
    try {
        const userData = {
            username: document.getElementById('profileName').value,
            nickname: document.getElementById('profileNickname').value,
            email: document.getElementById('profileEmail').value,
            bio: document.getElementById('profileBio').value,
            status: document.getElementById('profileStatus').value,
            gender: document.getElementById('profileGender').value,
            avatar: document.getElementById('currentAvatarImg')?.src || ''
        };

        // Salva nei due storage
        localStorage.setItem('userProfile', JSON.stringify(userData));
        localStorage.setItem('currentUser', JSON.stringify(userData));

        // Aggiorna navbar
        loadUserData();

        // Feedback visivo
        showSaveFeedback();
        
    } catch (error) {
        console.error('❌ Errore salvataggio profilo:', error);
        showTempMessage('❌ Errore nel salvataggio!', 'error');
    }
}

function showSaveFeedback() {
    const saveButton = document.querySelector('.save-btn');
    if (saveButton) {
        const originalText = saveButton.textContent;
        saveButton.textContent = '✅ Salvato!';
        saveButton.classList.add('saved');
        
        setTimeout(() => {
            saveButton.textContent = originalText;
            saveButton.classList.remove('saved');
        }, 2000);
    }
}

function handleAvatarUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const avatarImg = document.getElementById('currentAvatarImg');
                if (avatarImg) {
                    avatarImg.src = e.target.result;
                    saveProfileData(); // Salva automaticamente
                }
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

function showAvatarPicker() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🎨 Scegli Avatar Predefinito</h3>
                <button class="close-modal" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="avatar-grid" id="avatarGrid"></div>
        </div>
    `;

    document.body.appendChild(modal);

    const avatarGrid = document.getElementById('avatarGrid');
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#8B5CF6'];
    
    colors.forEach((color, index) => {
        const avatarOption = document.createElement('div');
        avatarOption.className = 'avatar-option';
        avatarOption.innerHTML = `
            <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="30" fill="${color}"/>
                <circle cx="30" cy="20" r="10" fill="#FFFFFF" opacity="0.8"/>
                <ellipse cx="30" cy="45" rx="12" ry="10" fill="#FFFFFF" opacity="0.8"/>
            </svg>
        `;
        avatarOption.addEventListener('click', () => {
            const avatarImg = document.getElementById('currentAvatarImg');
            if (avatarImg) {
                avatarImg.src = `data:image/svg+xml;base64,${btoa(avatarOption.innerHTML)}`;
                modal.remove();
                saveProfileData();
            }
        });
        avatarGrid.appendChild(avatarOption);
    });

    // Chiudi modal click esterno
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function deleteAvatar() {
    const avatarImg = document.getElementById('currentAvatarImg');
    if (avatarImg) {
        avatarImg.src = getDefaultAvatar();
        saveProfileData();
    }
}

// ==================== SEZIONE IMPOSTAZIONI ====================

function loadSettingsSection() {
    const mainContent = document.getElementById('mainContent');
    const subNavbar = document.getElementById('subNavbar');
    
    if (!mainContent) return;
    
    // Mostra sub-navbar impostazioni
    if (subNavbar) {
        subNavbar.classList.add('active');
        subNavbar.innerHTML = `
            <div class="sub-nav-buttons">
                <button class="sub-nav-btn active" onclick="loadSettingsSubsection('appearance')">🎨 Aspetto e Design</button>
                <button class="sub-nav-btn" onclick="loadSettingsSubsection('ux')">👤 Esperienza Utente</button>
                <button class="sub-nav-btn" onclick="loadSettingsSubsection('system')">⚙️ Sistema e Dati</button>
            </div>
        `;
    }
    
    // Carica impostazioni aspetto di default
    loadSettingsSubsection('appearance');
}

function loadSettingsSubsection(subsection) {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;
    
    switch(subsection) {
        case 'appearance':
            loadAppearanceSettings();
            break;
        case 'ux':
            loadUXSettings();
            break;
        case 'system':
            loadSystemSettings();
            break;
    }
}

// ==================== IMPOSTAZIONI ASPETTO ====================

function loadAppearanceSettings() {
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="settings-content">
                <h2>🎨 Aspetto e Design</h2>
                <p>Personalizza l'aspetto visivo di River</p>
                
                <div class="settings-grid">
                    <div class="setting-card" onclick="openQuickColors()">
                        <h3>🎨 Colori Rapidi</h3>
                        <p>Scegli palette di colori predefinite</p>
                        <button class="setting-btn">Apri Colori Rapidi</button>
                    </div>
                    
                    <div class="setting-card" onclick="openGradientColors()">
                        <h3>🌈 Colori Gradient</h3>
                        <p>Sfondi con gradienti spettacolari</p>
                        <button class="setting-btn">Apri Gradienti</button>
                    </div>
                    
                    <div class="setting-card" onclick="openLightingSettings()">
                        <h3>💡 Illuminazione</h3>
                        <p>Effetti glow per card e elementi</p>
                        <button class="setting-btn">Apri Illuminazione</button>
                    </div>
                    
                    <div class="setting-card" onclick="openTransparencySettings()">
                        <h3>🔍 Trasparenza</h3>
                        <p>Regola opacità elementi</p>
                        <button class="setting-btn">Apri Trasparenza</button>
                    </div>
                    
                    <div class="setting-card" onclick="openTextFontSettings()">
                        <h3>🔤 Testo e Font</h3>
                        <p>Personalizza caratteri e dimensioni</p>
                        <button class="setting-btn">Apri Testo e Font</button>
                    </div>
                    
                    <div class="setting-card" onclick="openBackgroundSettings()">
                        <h3>🖼️ Sfondo</h3>
                        <p>Carica immagine di sfondo personalizzata</p>
                        <button class="setting-btn">Apri Sfondo</button>
                    </div>
                </div>
            </div>
        `;
    }
}

// ==================== COLORI RAPIDI ====================

function openQuickColors() {
    const mainContent = document.getElementById('mainContent');
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    const currentTheme = settings.quickColors || 'default';
    
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="settings-detail">
                <div class="detail-header">
                    <button class="back-btn" onclick="loadSettingsSubsection('appearance')">← Torna a Aspetto</button>
                    <h2>🎨 Colori Rapidi</h2>
                </div>
                
                <p class="detail-description">Scegli e applica rapidamente palette di colori predefinite</p>
                
                <div class="current-setting-card">
                    <h4>🎯 Tema Attuale</h4>
                    <div class="current-theme-display">
                        <div class="theme-preview-small ${currentTheme}-theme"></div>
                        <span class="theme-name">${getThemeName(currentTheme)}</span>
                    </div>
                </div>
                
                <div class="themes-section">
                    <h4>🎨 Temi Predefiniti</h4>
                    <div class="themes-grid">
                        ${generateThemeCards()}
                    </div>
                </div>
                
                <div class="settings-actions">
                    <button class="reset-btn" onclick="resetQuickColors()">🔄 Ripristina Predefinito</button>
                </div>
            </div>
        `;

        // Aggiungi event listeners ai temi
        setTimeout(() => {
            document.querySelectorAll('.theme-card').forEach(card => {
                card.addEventListener('click', function() {
                    const theme = this.getAttribute('data-theme');
                    applyQuickColorTheme(theme, true);
                });
            });
        }, 100);
    }
}

function generateThemeCards() {
    const themes = [
        { id: 'default', name: 'Predefinito', colors: ['#3b82f6', '#0f172a', '#1e293b'] },
        { id: 'dark-blue', name: 'Blu Scuro', colors: ['#1d4ed8', '#0c1426', '#1e3a8a'] },
        { id: 'deep-purple', name: 'Viola Profondo', colors: ['#7c3aed', '#1e1b2e', '#4c1d95'] },
        { id: 'forest-green', name: 'Verde Foresta', colors: ['#059669', '#052e16', '#065f46'] },
        { id: 'sunset-orange', name: 'Arancione Tramonto', colors: ['#ea580c', '#451a03', '#9a3412'] },
        { id: 'midnight', name: 'Mezzanotte', colors: ['#0ea5e9', '#020617', '#0c4a6e'] },
        { id: 'ocean', name: 'Oceano', colors: ['#06b6d4', '#083344', '#0e7490'] },
        { id: 'berry', name: 'Bacca', colors: ['#db2777', '#500724', '#9d174d'] }
    ];

    return themes.map(theme => `
        <div class="theme-card" data-theme="${theme.id}">
            <div class="theme-preview">
                <div class="theme-color primary" style="background: ${theme.colors[0]}"></div>
                <div class="theme-color background" style="background: ${theme.colors[1]}"></div>
                <div class="theme-color card" style="background: ${theme.colors[2]}"></div>
            </div>
            <span class="theme-label">${theme.name}</span>
        </div>
    `).join('');
}

function getThemeName(themeId) {
    const names = {
        'default': 'Predefinito',
        'dark-blue': 'Blu Scuro', 
        'deep-purple': 'Viola Profondo',
        'forest-green': 'Verde Foresta',
        'sunset-orange': 'Arancione Tramonto',
        'midnight': 'Mezzanotte',
        'ocean': 'Oceano',
        'berry': 'Bacca'
    };
    return names[themeId] || 'Predefinito';
}

function applyQuickColorTheme(theme, showMessage = true) {
    const themes = {
        'default': { 
            primary: '#3b82f6', 
            background: '#0f172a', 
            card: '#1e293b',
            text: '#e2e8f0',
            border: '#334155'
        },
        'dark-blue': { 
            primary: '#1d4ed8', 
            background: '#0c1426', 
            card: '#1e3a8a',
            text: '#e2e8f0', 
            border: '#1e40af'
        },
        'deep-purple': { 
            primary: '#7c3aed', 
            background: '#1e1b2e', 
            card: '#4c1d95',
            text: '#e2e8f0',
            border: '#5b21b6'
        },
        'forest-green': { 
            primary: '#059669', 
            background: '#052e16', 
            card: '#065f46',
            text: '#e2e8f0',
            border: '#047857'
        },
        'sunset-orange': { 
            primary: '#ea580c', 
            background: '#451a03', 
            card: '#9a3412',
            text: '#e2e8f0',
            border: '#c2410c'
        },
        'midnight': { 
            primary: '#0ea5e9', 
            background: '#020617', 
            card: '#0c4a6e',
            text: '#e2e8f0',
            border: '#0369a1'
        },
        'ocean': { 
            primary: '#06b6d4', 
            background: '#083344', 
            card: '#0e7490',
            text: '#e2e8f0',
            border: '#0891b2'
        },
        'berry': { 
            primary: '#db2777', 
            background: '#500724', 
            card: '#9d174d',
            text: '#e2e8f0',
            border: '#be185d'
        }
    };

    const selectedTheme = themes[theme];
    
    // Applica il tema al CSS
    document.documentElement.style.setProperty('--primary-color', selectedTheme.primary);
    document.documentElement.style.setProperty('--background-color', selectedTheme.background);
    document.documentElement.style.setProperty('--card-color', selectedTheme.card);
    document.documentElement.style.setProperty('--text-color', selectedTheme.text);
    document.documentElement.style.setProperty('--border-color', selectedTheme.border);

    // Salva le impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    settings.quickColors = theme;
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));

    if (showMessage) {
        showTempMessage(`🎨 Tema "${getThemeName(theme)}" applicato!`);
    }
}

function resetQuickColors() {
    // Ripristina tema predefinito
    document.documentElement.style.setProperty('--primary-color', '#3b82f6');
    document.documentElement.style.setProperty('--background-color', '#0f172a');
    document.documentElement.style.setProperty('--card-color', '#1e293b');
    document.documentElement.style.setProperty('--text-color', '#e2e8f0');
    document.documentElement.style.setProperty('--border-color', '#334155');
    
    // Rimuovi dalle impostazioni salvate
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    delete settings.quickColors;
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
    
    showTempMessage('🔄 Tema reimpostato al predefinito!');
}

// ==================== COLORI GRADIENT ====================

function openGradientColors() {
    const mainContent = document.getElementById('mainContent');
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    const currentGradient = settings.gradient || 'none';
    
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="settings-detail">
                <div class="detail-header">
                    <button class="back-btn" onclick="loadSettingsSubsection('appearance')">← Torna a Aspetto</button>
                    <h2>🌈 Colori Gradient</h2>
                </div>
                
                <p class="detail-description">Sfondi con gradienti spettacolari e colori contrastanti per un look unico</p>
                
                <div class="current-setting-card">
                    <h4>🎯 Gradiente Attuale</h4>
                    <div class="current-theme-display">
                        <div class="theme-preview-small" style="background: ${getGradientStyle(currentGradient)}"></div>
                        <span class="theme-name">${getGradientName(currentGradient)}</span>
                    </div>
                </div>
                
                <div class="themes-section">
                    <h4>🎨 Gradienti Predefiniti</h4>
                    <div class="gradients-grid">
                        ${generateGradientCards()}
                    </div>
                </div>
                
                <div class="settings-actions">
                    <button class="reset-btn" onclick="resetGradientColors()">🔄 Rimuovi Gradiente</button>
                </div>
            </div>
        `;

        // Aggiungi event listeners ai gradienti
        setTimeout(() => {
            document.querySelectorAll('.gradient-card').forEach(card => {
                card.addEventListener('click', function() {
                    const gradient = this.getAttribute('data-gradient');
                    applyGradientTheme(gradient, true);
                });
            });
        }, 100);
    }
}

function generateGradientCards() {
    const gradients = [
        { id: 'sunset', name: 'Tramonto', colors: ['#ff6b6b', '#ffa726'] },
        { id: 'ocean', name: 'Oceano', colors: ['#4facfe', '#00f2fe'] },
        { id: 'forest', name: 'Foresta', colors: ['#43e97b', '#38f9d7'] },
        { id: 'berry', name: 'Bacca', colors: ['#fa709a', '#fee140'] },
        { id: 'purple', name: 'Viola', colors: ['#a18cd1', '#fbc2eb'] },
        { id: 'sky', name: 'Cielo', colors: ['#89f7fe', '#66a6ff'] },
        { id: 'fire', name: 'Fuoco', colors: ['#ffecd2', '#fcb69f'] },
        { id: 'deep-space', name: 'Spazio', colors: ['#434343', '#000000'] }
    ];

    return gradients.map(gradient => `
        <div class="gradient-card" data-gradient="${gradient.id}" data-name="${gradient.name}" 
             style="background: linear-gradient(135deg, ${gradient.colors[0]}, ${gradient.colors[1]})">
        </div>
    `).join('');
}

function getGradientStyle(gradientId) {
    const gradients = {
        'sunset': 'linear-gradient(135deg, #ff6b6b, #ffa726)',
        'ocean': 'linear-gradient(135deg, #4facfe, #00f2fe)',
        'forest': 'linear-gradient(135deg, #43e97b, #38f9d7)',
        'berry': 'linear-gradient(135deg, #fa709a, #fee140)',
        'purple': 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
        'sky': 'linear-gradient(135deg, #89f7fe, #66a6ff)',
        'fire': 'linear-gradient(135deg, #ffecd2, #fcb69f)',
        'deep-space': 'linear-gradient(135deg, #434343, #000000)',
        'none': 'var(--background-color)'
    };
    return gradients[gradientId] || gradients.none;
}

function getGradientName(gradientId) {
    const names = {
        'sunset': 'Tramonto',
        'ocean': 'Oceano',
        'forest': 'Foresta',
        'berry': 'Bacca',
        'purple': 'Viola',
        'sky': 'Cielo',
        'fire': 'Fuoco',
        'deep-space': 'Spazio',
        'none': 'Nessuno'
    };
    return names[gradientId] || 'Nessuno';
}

function applyGradientTheme(gradient, showMessage = true) {
    const gradientStyle = getGradientStyle(gradient);
    
    if (gradient === 'none') {
        // Ripristina sfondo solido
        document.documentElement.style.setProperty('--background-color', '#0f172a');
    } else {
        // Applica gradiente
        document.documentElement.style.setProperty('--background-color', gradientStyle);
    }

    // Salva impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    settings.gradient = gradient;
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));

    if (showMessage) {
        showTempMessage(`🌈 Gradiente "${getGradientName(gradient)}" applicato!`);
    }
}

function resetGradientColors() {
    // Ripristina sfondo predefinito
    document.documentElement.style.setProperty('--background-color', '#0f172a');
    
    // Rimuovi dalle impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    delete settings.gradient;
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
    
    showTempMessage('🔄 Gradiente rimosso!');
}

// ==================== ILLUMINAZIONE ====================

function openLightingSettings() {
    const mainContent = document.getElementById('mainContent');
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    const lighting = settings.lighting || { color: 'blue', intensity: 50, blur: 10 };
    
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="settings-detail">
                <div class="detail-header">
                    <button class="back-btn" onclick="loadSettingsSubsection('appearance')">← Torna a Aspetto</button>
                    <h2>💡 Illuminazione</h2>
                </div>
                
                <p class="detail-description">Scegli il colore e l'intensità dell'effetto illuminazione per le card e gli elementi interattivi</p>
                
                <div class="current-setting-card">
                    <h4>🎯 Anteprima Illuminazione</h4>
                    <div class="glow-preview" id="glowPreview">
                        Anteprima Effetto Glow
                    </div>
                </div>
                
                <div class="control-group">
                    <h4>🎨 Colore Illuminazione</h4>
                    <div class="color-grid">
                        <div class="color-option ${lighting.color === 'blue' ? 'active' : ''}" data-color="blue" style="background: #3b82f6" onclick="updateLightingColor('blue')">Blu</div>
                        <div class="color-option ${lighting.color === 'green' ? 'active' : ''}" data-color="green" style="background: #10b981" onclick="updateLightingColor('green')">Verde</div>
                        <div class="color-option ${lighting.color === 'purple' ? 'active' : ''}" data-color="purple" style="background: #8b5cf6" onclick="updateLightingColor('purple')">Viola</div>
                        <div class="color-option ${lighting.color === 'red' ? 'active' : ''}" data-color="red" style="background: #ef4444" onclick="updateLightingColor('red')">Rosso</div>
                        <div class="color-option ${lighting.color === 'yellow' ? 'active' : ''}" data-color="yellow" style="background: #f59e0b" onclick="updateLightingColor('yellow')">Giallo</div>
                        <div class="color-option ${lighting.color === 'pink' ? 'active' : ''}" data-color="pink" style="background: #ec4899" onclick="updateLightingColor('pink')">Rosa</div>
                    </div>
                </div>
                
                <div class="slider-container">
                    <label class="control-label">Intensità: <span id="intensityValue">${lighting.intensity}%</span></label>
                    <input type="range" min="0" max="100" value="${lighting.intensity}" class="slider" id="intensitySlider" oninput="updateLightingIntensity(this.value)">
                </div>
                
                <div class="slider-container">
                    <label class="control-label">Sfocatura: <span id="blurValue">${lighting.blur}px</span></label>
                    <input type="range" min="0" max="50" value="${lighting.blur}" class="slider" id="blurSlider" oninput="updateLightingBlur(this.value)">
                </div>
                
                <div class="settings-actions">
                    <button class="reset-btn" onclick="resetLightingSettings()">🔄 Disattiva Illuminazione</button>
                </div>
            </div>
        `;

        // Aggiorna anteprima
        updateGlowPreview();
    }
}

function updateGlowPreview() {
    const preview = document.getElementById('glowPreview');
    if (preview) {
        const glowColor = getComputedStyle(document.documentElement).getPropertyValue('--glow-color').trim();
        const glowBlur = getComputedStyle(document.documentElement).getPropertyValue('--glow-blur').trim();
        preview.style.boxShadow = `0 0 ${glowBlur} ${glowColor}`;
    }
}

function updateLightingColor(color) {
    const colorMap = {
        'blue': 'rgba(59, 130, 246, 0.5)',
        'green': 'rgba(16, 185, 129, 0.5)',
        'purple': 'rgba(139, 92, 246, 0.5)',
        'red': 'rgba(239, 68, 68, 0.5)',
        'yellow': 'rgba(245, 158, 11, 0.5)',
        'pink': 'rgba(236, 72, 153, 0.5)'
    };
    
    document.documentElement.style.setProperty('--glow-color', colorMap[color]);
    
    // Salva impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    if (!settings.lighting) settings.lighting = {};
    settings.lighting.color = color;
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
    
    // Aggiorna selezione colori
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
    document.querySelector(`[data-color="${color}"]`).classList.add('active');
    
    updateGlowPreview();
}

function updateLightingIntensity(value) {
    const intensity = value / 100;
    const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--glow-color');
    const newColor = currentColor.replace(/rgba?\(([^,]+),([^,]+),([^,]+),([^)]+)\)/, `rgba($1,$2,$3,${intensity})`);
    
    document.documentElement.style.setProperty('--glow-color', newColor);
    document.getElementById('intensityValue').textContent = `${value}%`;
    
    // Salva impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    if (!settings.lighting) settings.lighting = {};
    settings.lighting.intensity = parseInt(value);
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
    
    updateGlowPreview();
}

function updateLightingBlur(value) {
    document.documentElement.style.setProperty('--glow-blur', `${value}px`);
    document.getElementById('blurValue').textContent = `${value}px`;
    
    // Salva impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    if (!settings.lighting) settings.lighting = {};
    settings.lighting.blur = parseInt(value);
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
    
    updateGlowPreview();
}

function resetLightingSettings() {
    // Disattiva illuminazione
    document.documentElement.style.setProperty('--glow-color', 'rgba(59, 130, 246, 0)');
    document.documentElement.style.setProperty('--glow-blur', '0px');
    
    // Rimuovi impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    delete settings.lighting;
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
    
    showTempMessage('💡 Illuminazione disattivata!');
}

// ==================== TRASPARENZA ====================

function openTransparencySettings() {
    const mainContent = document.getElementById('mainContent');
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    const transparency = settings.transparency || { app: 100, card: 100, text: 100 };
    
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="settings-detail">
                <div class="detail-header">
                    <button class="back-btn" onclick="loadSettingsSubsection('appearance')">← Torna a Aspetto</button>
                    <h2>🔍 Trasparenza</h2>
                </div>
                
                <p class="detail-description">Regola l'opacità degli elementi dell'interfaccia</p>
                
                <div class="current-setting-card">
                    <h4>📊 Opacità Correnti</h4>
                    <div class="opacity-grid">
                        <div class="opacity-control">
                            <label class="control-label">Applicazione: <span id="appOpacityValue">${transparency.app}%</span></label>
                            <input type="range" min="10" max="100" value="${transparency.app}" class="slider" oninput="updateAppOpacity(this.value)">
                        </div>
                        <div class="opacity-control">
                            <label class="control-label">Card: <span id="cardOpacityValue">${transparency.card}%</span></label>
                            <input type="range" min="10" max="100" value="${transparency.card}" class="slider" oninput="updateCardOpacity(this.value)">
                        </div>
                        <div class="opacity-control">
                            <label class="control-label">Testo: <span id="textOpacityValue">${transparency.text}%</span></label>
                            <input type="range" min="10" max="100" value="${transparency.text}" class="slider" oninput="updateTextOpacity(this.value)">
                        </div>
                    </div>
                </div>
                
                <div class="settings-actions">
                    <button class="reset-btn" onclick="resetTransparencySettings()">🔄 Ripristina Opacità</button>
                </div>
            </div>
        `;
    }
}

function updateAppOpacity(value) {
    const opacity = value / 100;
    document.documentElement.style.setProperty('--app-opacity', opacity);
    document.getElementById('appOpacityValue').textContent = `${value}%`;
    
    // Salva impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    if (!settings.transparency) settings.transparency = {};
    settings.transparency.app = parseInt(value);
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
}

function updateCardOpacity(value) {
    const opacity = value / 100;
    document.documentElement.style.setProperty('--card-opacity', opacity);
    document.getElementById('cardOpacityValue').textContent = `${value}%`;
    
    // Salva impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    if (!settings.transparency) settings.transparency = {};
    settings.transparency.card = parseInt(value);
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
}

function updateTextOpacity(value) {
    const opacity = value / 100;
    document.documentElement.style.setProperty('--text-opacity', opacity);
    document.getElementById('textOpacityValue').textContent = `${value}%`;
    
    // Salva impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    if (!settings.transparency) settings.transparency = {};
    settings.transparency.text = parseInt(value);
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
}

function resetTransparencySettings() {
    // Ripristina opacità predefinita
    document.documentElement.style.setProperty('--app-opacity', '1');
    document.documentElement.style.setProperty('--card-opacity', '1');
    document.documentElement.style.setProperty('--text-opacity', '1');
    
    // Rimuovi impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    delete settings.transparency;
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
    
    // Aggiorna UI
    document.getElementById('appOpacityValue').textContent = '100%';
    document.getElementById('cardOpacityValue').textContent = '100%';
    document.getElementById('textOpacityValue').textContent = '100%';
    
    // Ripristina slider
    document.querySelectorAll('.slider').forEach(slider => {
        slider.value = 100;
    });
    
    showTempMessage('🔍 Opacità ripristinate!');
}

// ==================== TESTO E FONT ====================

function openTextFontSettings() {
    const mainContent = document.getElementById('mainContent');
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    const font = settings.font || { family: 'default', size: 14 };
    
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="settings-detail">
                <div class="detail-header">
                    <button class="back-btn" onclick="loadSettingsSubsection('appearance')">← Torna a Aspetto</button>
                    <h2>🔤 Testo e Font</h2>
                </div>
                
                <p class="detail-description">Scegli il carattere tipografico, la dimensione e il colore del testo per l'applicazione</p>
                
                <div class="current-setting-card">
                    <h4>📝 Carattere Attuale</h4>
                    <div style="font-family: ${getFontFamily(font.family)}; font-size: ${font.size}px; padding: 20px; background: var(--card-color); border-radius: 8px; border: 1px solid var(--border-color);">
                        Questo è un esempio del font selezionato - River 2.0
                    </div>
                </div>
                
                <div class="control-group">
                    <h4>🔤 Famiglia Font</h4>
                    <div class="font-grid">
                        <div class="font-option ${font.family === 'default' ? 'active' : ''}" data-font="default" onclick="updateFontFamily('default')">
                            <div class="font-preview" style="font-family: 'Segoe UI', sans-serif">Aa</div>
                            <div class="font-name">System Default</div>
                        </div>
                        <div class="font-option ${font.family === 'arial' ? 'active' : ''}" data-font="arial" onclick="updateFontFamily('arial')">
                            <div class="font-preview" style="font-family: Arial, sans-serif">Aa</div>
                            <div class="font-name">Arial</div>
                        </div>
                        <div class="font-option ${font.family === 'georgia' ? 'active' : ''}" data-font="georgia" onclick="updateFontFamily('georgia')">
                            <div class="font-preview" style="font-family: Georgia, serif">Aa</div>
                            <div class="font-name">Georgia</div>
                        </div>
                        <div class="font-option ${font.family === 'monospace' ? 'active' : ''}" data-font="monospace" onclick="updateFontFamily('monospace')">
                            <div class="font-preview" style="font-family: 'Courier New', monospace">Aa</div>
                            <div class="font-name">Monospace</div>
                        </div>
                    </div>
                </div>
                
                <div class="slider-container">
                    <label class="control-label">Dimensione Testo: <span id="fontSizeValue">${font.size}px</span></label>
                    <input type="range" min="10" max="20" value="${font.size}" class="slider" oninput="updateFontSize(this.value)">
                </div>
                
                <div class="settings-actions">
                    <button class="reset-btn" onclick="resetFontSettings()">🔄 Ripristina Font</button>
                </div>
            </div>
        `;
    }
}

function getFontFamily(fontId) {
    const fonts = {
        'default': "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        'arial': "Arial, sans-serif",
        'georgia': "Georgia, serif",
        'monospace': "'Courier New', monospace"
    };
    return fonts[fontId] || fonts.default;
}

function updateFontFamily(font) {
    const fontFamily = getFontFamily(font);
    document.documentElement.style.setProperty('--font-family', fontFamily);
    
    // Salva impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    if (!settings.font) settings.font = {};
    settings.font.family = font;
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
    
    // Aggiorna selezione
    document.querySelectorAll('.font-option').forEach(opt => opt.classList.remove('active'));
    document.querySelector(`[data-font="${font}"]`).classList.add('active');
    
    showTempMessage(`🔤 Font "${font}" applicato!`);
}

function updateFontSize(value) {
    document.documentElement.style.setProperty('--font-size', `${value}px`);
    document.getElementById('fontSizeValue').textContent = `${value}px`;
    
    // Salva impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    if (!settings.font) settings.font = {};
    settings.font.size = parseInt(value);
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
}

function resetFontSettings() {
    // Ripristina font predefiniti
    document.documentElement.style.setProperty('--font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif");
    document.documentElement.style.setProperty('--font-size', '14px');
    
    // Rimuovi impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    delete settings.font;
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
    
    // Aggiorna UI
    document.querySelectorAll('.font-option').forEach(opt => opt.classList.remove('active'));
    document.querySelector('[data-font="default"]').classList.add('active');
    document.getElementById('fontSizeValue').textContent = '14px';
    document.querySelector('input[type="range"]').value = 14;
    
    showTempMessage('🔤 Font ripristinati!');
}

// ==================== SFONDO ====================

function openBackgroundSettings() {
    const mainContent = document.getElementById('mainContent');
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    const background = settings.background || { image: 'none' };
    
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="settings-detail">
                <div class="detail-header">
                    <button class="back-btn" onclick="loadSettingsSubsection('appearance')">← Torna a Aspetto</button>
                    <h2>🖼️ Sfondo</h2>
                </div>
                
                <p class="detail-description">Carica un'immagine di sfondo personalizzata per l'applicazione</p>
                
                <div class="current-setting-card">
                    <h4>🎯 Sfondo Attuale</h4>
                    <div class="background-preview" id="backgroundPreview" style="background-image: var(--background-image); ${background.image === 'none' ? 'background: var(--card-color); display: flex; align-items: center; justify-content: center;' : ''}">
                        ${background.image === 'none' ? 'Nessuna immagine di sfondo' : ''}
                    </div>
                </div>
                
                <div class="background-upload" onclick="uploadBackgroundImage()">
                    <div class="upload-icon">📁</div>
                    <h4>Carica Immagine di Sfondo</h4>
                    <p>Clicca qui per selezionare un'immagine dal tuo computer</p>
                    <p style="font-size: 12px; opacity: 0.7;">Formati supportati: JPG, PNG, GIF</p>
                </div>
                
                <div class="settings-actions">
                    <button class="reset-btn" onclick="resetBackgroundSettings()">🔄 Rimuovi Sfondo</button>
                </div>
            </div>
        `;
    }
}

function uploadBackgroundImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                applyBackgroundSettings(e.target.result, true);
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

function applyBackgroundSettings(imageData, showMessage = true) {
    document.documentElement.style.setProperty('--background-image', `url(${imageData})`);
    
    // Salva impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    settings.background = { image: imageData };
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
    
    // Aggiorna anteprima
    const preview = document.getElementById('backgroundPreview');
    if (preview) {
        preview.style.backgroundImage = `url(${imageData})`;
        preview.innerHTML = '';
        preview.style.display = 'block';
    }
    
    if (showMessage) {
        showTempMessage('🖼️ Sfondo personalizzato applicato!');
    }
}

function resetBackgroundSettings() {
    // Rimuovi sfondo
    document.documentElement.style.setProperty('--background-image', 'none');
    
    // Rimuovi impostazioni
    const settings = JSON.parse(localStorage.getItem('appearanceSettings') || '{}');
    delete settings.background;
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
    
    // Aggiorna anteprima
    const preview = document.getElementById('backgroundPreview');
    if (preview) {
        preview.style.backgroundImage = 'none';
        preview.innerHTML = 'Nessuna immagine di sfondo';
        preview.style.display = 'flex';
        preview.style.alignItems = 'center';
        preview.style.justifyContent = 'center';
    }
    
    showTempMessage('🔄 Sfondo rimosso!');
}

// ==================== ESPERIENZA UTENTE ====================

function loadUXSettings() {
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="settings-detail">
                <div class="detail-header">
                    <button class="back-btn" onclick="loadSettingsSubsection('appearance')">← Torna a Impostazioni</button>
                    <h2>👤 Esperienza Utente e Interazione</h2>
                </div>
                <p class="detail-description">Personalizza come interagisci con River</p>
                
                <div class="current-setting-card">
                    <h4>⚡ Scorciatoie da Tastiera</h4>
                    <p>Funzionalità in sviluppo - Disponibile presto!</p>
                </div>
                
                <div class="current-setting-card">
                    <h4>🎬 Animazioni</h4>
                    <p>Funzionalità in sviluppo - Disponibile presto!</p>
                </div>
                
                <div class="current-setting-card">
                    <h4>🔔 Notifiche</h4>
                    <p>Funzionalità in sviluppo - Disponibile presto!</p>
                </div>
            </div>
        `;
    }
}

// ==================== SISTEMA E DATI ====================

function loadSystemSettings() {
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="settings-detail">
                <div class="detail-header">
                    <button class="back-btn" onclick="loadSettingsSubsection('appearance')">← Torna a Impostazioni</button>
                    <h2>⚙️ Sistema e Dati</h2>
                </div>
                <p class="detail-description">Gestisci i dati e le impostazioni di sistema</p>
                
                <div class="current-setting-card">
                    <h4>💾 Backup e Ripristino</h4>
                    <p>Funzionalità in sviluppo - Disponibile presto!</p>
                </div>
                
                <div class="current-setting-card">
                    <h4>🧹 Pulizia Dati</h4>
                    <p>Funzionalità in sviluppo - Disponibile presto!</p>
                </div>
                
                <div class="current-setting-card">
                    <h4>🔍 Informazioni Sistema</h4>
                    <p>Funzionalità in sviluppo - Disponibile presto!</p>
                </div>
            </div>
        `;
    }
}

// ==================== UTILITY FUNCTIONS ====================

function showTempMessage(message, type = 'success') {
    // Rimuovi messaggi precedenti
    const existingMessage = document.querySelector('.temp-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Crea nuovo messaggio
    const messageDiv = document.createElement('div');
    messageDiv.className = 'temp-message';
    messageDiv.textContent = message;
    
    // Stile in base al tipo
    if (type === 'error') {
        messageDiv.style.background = '#ef4444';
    } else {
        messageDiv.style.background = 'var(--primary-color, #3b82f6)';
    }
    
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color, #3b82f6);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(messageDiv);
    
    // Auto-rimuovi dopo 3 secondi
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

// ==================== APPLICA IMPOSTAZIONI SALVATE ====================

function applyLightingSettings(lighting, showMessage = false) {
    if (!lighting) return;
    
    const colorMap = {
        'blue': 'rgba(59, 130, 246, 0.5)',
        'green': 'rgba(16, 185, 129, 0.5)',
        'purple': 'rgba(139, 92, 246, 0.5)',
        'red': 'rgba(239, 68, 68, 0.5)',
        'yellow': 'rgba(245, 158, 11, 0.5)',
        'pink': 'rgba(236, 72, 153, 0.5)'
    };
    
    const color = colorMap[lighting.color] || colorMap.blue;
    const intensity = (lighting.intensity || 50) / 100;
    const finalColor = color.replace(/[\d.]+\)$/, `${intensity})`);
    
    document.documentElement.style.setProperty('--glow-color', finalColor);
    document.documentElement.style.setProperty('--glow-blur', `${lighting.blur || 10}px`);
}

function applyTransparencySettings(transparency, showMessage = false) {
    if (!transparency) return;
    
    document.documentElement.style.setProperty('--app-opacity', (transparency.app || 100) / 100);
    document.documentElement.style.setProperty('--card-opacity', (transparency.card || 100) / 100);
    document.documentElement.style.setProperty('--text-opacity', (transparency.text || 100) / 100);
}

function applyFontSettings(font, showMessage = false) {
    if (!font) return;
    
    document.documentElement.style.setProperty('--font-family', getFontFamily(font.family));
    document.documentElement.style.setProperty('--font-size', `${font.size || 14}px`);
}

function applyBackgroundSettings(background, showMessage = false) {
    if (!background || background.image === 'none') return;
    document.documentElement.style.setProperty('--background-image', `url(${background.image})`);
}

console.log('✅ River - renderer.js caricato completamente!');