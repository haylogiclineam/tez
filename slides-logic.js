document.addEventListener('DOMContentLoaded', () => {
    const topicId = getUrlParameter('topic');

    if (topicId) {
        const id = parseInt(topicId);
        const topic = THEMES.find(t => t.id === id);

        if (topic) {
            document.getElementById('slidesTitle').textContent = topic.title;
            // document.getElementById('currentTopic').textContent = topic.title;
            // document.getElementById('slidesSummary').innerHTML = topic.content;

            // Генерируем путь к видео динамически
            const videoPath = `video/topic${id}.mp4`;

            const videoContainer = document.getElementById('videoContainer');
            videoContainer.innerHTML = `
                <video 
                    width="640" 
                    height="360" 
                    controls 
                    autoplay 
                    muted 
                    loop
                    style="border-radius: 10px; max-width: 100%;">
                    <source src="${videoPath}" type="video/mp4">
                    Ձեր բրաուզերը չի աջակցում վիդեո թեգը։
                </video>
            `;
        } else {
            document.getElementById('slidesTitle').textContent = 'Թեմա չի գտնվել։';
        }
    } else {
        document.getElementById('slidesTitle').textContent = 'Բացակայում է Թեմայի նույնականացուցիչը։';
    }
});
