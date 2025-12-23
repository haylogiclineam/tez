document.addEventListener('DOMContentLoaded', () => {
    const topicIdFromUrl = parseInt(getUrlParameter('topic')) || 1;

    const sidebar = document.getElementById('themesSidebar');
    const videoContainer = document.getElementById('videoContainer');
    const titleEl = document.getElementById('slidesTitle');

    THEMES.forEach(theme => {
        const item = document.createElement('div');
        item.className = 'theme-item';
        item.textContent = theme.title;
        item.dataset.id = theme.id;

        if (theme.id === topicIdFromUrl) {
            item.classList.add('active');
        }

        item.addEventListener('click', () => {
            loadTheme(theme.id);
            setActive(theme.id);
            history.pushState(null, '', `?topic=${theme.id}`);
        });

        sidebar.appendChild(item);
    });

    function loadTheme(id) {
        const theme = THEMES.find(t => t.id === id);
        if (!theme) return;

        titleEl.textContent = theme.title;

        videoContainer.innerHTML = `
            <video 
                controls 
                autoplay 
                muted 
                loop
                style="width:100%; border-radius:10px;">
                <source src="video/topic${id}.mp4" type="video/mp4">
                Ձեր բրաուզերը չի աջակցում վիդեո թեգը։
            </video>
        `;
    }

    function setActive(id) {
        document.querySelectorAll('.theme-item').forEach(el => {
            el.classList.toggle('active', parseInt(el.dataset.id) === id);
        });
    }

    loadTheme(topicIdFromUrl);
});
