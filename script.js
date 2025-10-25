document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DOM Element Selection ---
    const sidebar = document.getElementById('customizer-sidebar');
    const livePreview = document.getElementById('live-preview');
    const openBtn = document.getElementById('open-btn');
    const closeBtn = document.getElementById('close-btn');

    // Menu Elements
    const menuItems = document.querySelectorAll('.menu-item');
    const backBtns = document.querySelectorAll('.back-btn');
    const menuLevels = document.querySelectorAll('.menu-level');

    // Preview Elements
    const previewBody = document.body;
    const previewContent = document.getElementById('preview-content');
    const previewHeading = document.getElementById('preview-heading');
    const previewButton = document.querySelector('.preview-button');
    const previewCard = document.querySelector('.card');
    const previewViewport = document.getElementById('preview-viewport');
    const previewHeader = document.getElementById('preview-header');

    // Customizer Input Elements
    const bgColorInput = document.getElementById('bg-color');
    const textColorInput = document.getElementById('text-color');
    const fontSizeInput = document.getElementById('font-size');
    const fontSizeValueSpan = document.getElementById('font-size-value');
    const headingTextInput = document.getElementById('heading-text');
    const headerImgInput = document.getElementById('header-img');
    const headerHeightInput = document.getElementById('header-height');
    const headerHeightValueSpan = document.getElementById('header-height-value');
    const btnColorInput = document.getElementById('btn-color');
    const btnRadiusInput = document.getElementById('btn-radius');
    const btnRadiusValueSpan = document.getElementById('btn-radius-value');
    
    // Status Elements
    const saveBtn = document.querySelector('.save-btn');
    const publishBtn = document.querySelector('.publish-btn');
    const statusMessage = document.getElementById('status-message');
    const overlayMessage = document.getElementById('overlay-message');
    const deviceBtns = document.querySelectorAll('.device-buttons i');
    
    // --- 2. Sidebar Toggle Functionality ---
    const showSidebar = () => {
        sidebar.classList.remove('hidden');
        livePreview.classList.add('dimmed');
        openBtn.style.opacity = '0';
    };

    const hideSidebar = () => {
        sidebar.classList.add('hidden');
        livePreview.classList.remove('dimmed');
        // Wait for the animation before showing the button
        setTimeout(() => {
            openBtn.style.opacity = '1';
        }, 500); 
    };

    openBtn.addEventListener('click', showSidebar);
    closeBtn.addEventListener('click', hideSidebar);

    // --- 3. Nested Menu Navigation (Impressive Transition) ---
    const navigateTo = (targetId) => {
        menuLevels.forEach(menu => {
            // Apply the 'active' class to slide the target menu into view
            if (menu.id === targetId) {
                menu.classList.add('active');
            } else {
                menu.classList.remove('active');
            }
        });
    };

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            navigateTo(item.dataset.target);
        });
    });

    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navigateTo(btn.dataset.target);
        });
    });

    // --- 4. Live Preview Update Functionality (Core Logic) ---

    // A single, comprehensive update function
    const updatePreview = () => {
        // General Design (Colors & Typography)
        previewBody.style.backgroundColor = bgColorInput.value;
        previewContent.style.color = textColorInput.value;
        previewContent.style.fontSize = `${fontSizeInput.value}px`;
        fontSizeValueSpan.textContent = fontSizeInput.value;

        // Heading
        previewHeading.textContent = headingTextInput.value;

        // Header & Layout
        previewHeader.style.backgroundImage = `url(${headerImgInput.value})`;
        previewHeader.style.height = `${headerHeightInput.value}vh`;
        headerHeightValueSpan.textContent = headerHeightInput.value;

        // Buttons & Elements
        previewButton.style.backgroundColor = btnColorInput.value;
        previewCard.style.borderRadius = `${btnRadiusInput.value}px`;
        previewButton.style.borderRadius = `${btnRadiusInput.value}px`;
        btnRadiusValueSpan.textContent = btnRadiusInput.value;
    };

    // Attach listeners to all inputs for real-time update
    document.querySelectorAll('#customizer-sidebar input').forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Initial load
    updatePreview(); 
    
    // --- 5. Device Viewport Control (More Action) ---
    deviceBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const device = e.currentTarget.dataset.device;
            
            // Remove active class from all, add to current
            deviceBtns.forEach(d => d.classList.remove('active-device'));
            e.currentTarget.classList.add('active-device');

            // Apply device class to viewport for CSS resizing
            previewViewport.className = ''; // Clear previous classes
            previewViewport.classList.add(device);
        });
    });
    // Set initial device
    previewViewport.classList.add('desktop');

    // --- 6. Enhanced Save/Publish Button Functionality ---

    // Function to handle the success state with overlay animation
    const handleSuccess = (type) => {
        // 1. Show Footer Status Message (Save Changes)
        statusMessage.textContent = type === 'save' ? '✓ Changes Saved!' : '🚀 Project Published!';
        statusMessage.classList.add('visible');
        
        // 2. Show Large Success Overlay (Publish)
        if (type === 'publish') {
            overlayMessage.innerHTML = `<i class="fas fa-check-circle"></i> Published Successfully!`;
            overlayMessage.classList.add('visible');
            hideSidebar(); // Hide sidebar after publishing
        }

        // 3. Reset after animation
        setTimeout(() => {
            statusMessage.classList.remove('visible');
            overlayMessage.classList.remove('visible');
        }, 1500); 
    };

    saveBtn.addEventListener('click', () => {
        handleSuccess('save');
    });

    publishBtn.addEventListener('click', () => {
        handleSuccess('publish');
    });
});