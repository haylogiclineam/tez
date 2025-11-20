document.addEventListener('DOMContentLoaded', () => {
    const topicId = getUrlParameter('topic');

    if (topicId) {
        const id = parseInt(topicId);
        const topic = THEMES.find(t => t.id === id);

        const audioSlidesLink = `slides/topic${id}_audio.pptx`;
        
        if (topic) {
            document.getElementById('slidesTitle').textContent = topic.title;
            document.getElementById('currentTopic').textContent = topic.title;
            document.getElementById('slidesSummary').innerHTML = topic.content;

            const downloadLinkMain = document.getElementById('downloadLinkMain');
            const downloadLinkSidebar = document.getElementById('downloadLinkSidebar');

            downloadLinkMain.href = audioSlidesLink;
            downloadLinkSidebar.href = audioSlidesLink;
            
            const filename = `${topic.title} (Ձայնով).pptx`;
            downloadLinkMain.setAttribute('download', filename);
            downloadLinkSidebar.setAttribute('download', filename);

            document.getElementById('quizLink').href = `test.html?test=${id}`;

        } else {
            document.getElementById('slidesTitle').textContent = 'Թեմա չի գտնվել։';
        }
    } else {
        document.getElementById('slidesTitle').textContent = 'Բացակայում է Թեմայի նույնականացուցիչը։';
    }
});