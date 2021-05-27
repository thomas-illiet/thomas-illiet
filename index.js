/**
 * README Generator
 */
const md = require('markdown-it')({
    html: true,
    linkify: true,
    breaks: true
});
const mdEmoji = require('markdown-it-emoji');
const fs = require('fs');
const axios = require('axios').default;

md.use(mdEmoji);

const BLOG_HOST = `https://thomas-illiet.fr`;

/* README Sections */
const introTitle = generateTitle(2, `Hey :wave:, I'm ${generateLink('Thomas', 'https://www.linkedin.com/in/thomas-illiet')}`);
const introDescription = `I'm currently a .NET engineer based in france. I am working on some side projects, learning a couple new dishes, and trying to conquer the world of ${generateLink('@Microsoft', 'https://microsoft.com')} technologies.`;

const badgeConfigs = [{
        name: 'Website',
        badgeText: 'thomas-illiet.fr',
        labelBgColor: '4E69C8',
        logoBgColor: '4E69C8',
        logo: 'Firefox',
        link: 'https://www.thomas-illiet.fr',
    },
    {
        name: 'LinkedIn',
        badgeText: '@thomas-illiet',
        labelBgColor: '0077B5',
        logoBgColor: '0077B5',
        logo: 'LinkedIn',
        link: 'https://www.linkedin.com/in/thomas-illiet',
    },
    {
        name: 'Spotify',
        badgeText: '@thomas-illiet',
        labelBgColor: '1ED760',
        logoBgColor: 'fff',
        logo: 'Spotify',
        link: 'hhttps://open.spotify.com/user/thomas-illiet',
    },
];
const badges = badgeConfigs.reduce((result, config) => result + ' ' + generateBadge(config), '');

const gif = `<img align="right" src="https://media2.giphy.com/media/iIqmM5tTjmpOB9mpbn/giphy.gif" />`;
const factsTitle = generateTitle(2, `:zap: A Few Quick Facts`);
const factsConfigs = [
    `🛠   I’m currently working with .NET, PoerShell, OData, SQLServer, etc.`,
    `🚀   Learning about **serverless architectures**, **distributed systems**.`,
    `👨🏻‍💻   Most of my projects are available on [Github](https://github.com/thomas-illiet).`,
    `📫   Ping me about **react, koa, security, and cloud stuff**.`,
    `📝   Check out my [resume](https://www.linkedin.com/in/thomas-illiet).`,
    `👾 Fun fact: Equal is Not Always Equal in Javascript.`,
];
const facts = factsConfigs.reduce((result, fact) => result + `\n - ${fact}`, '');

const favoritesTitle = generateTitle(2, `:zap: My Absolute Favorites:`);
const favoritesConfigs = [
    `💻   I love exploring new tech stack and building cool stuffs.`,
    `📰   Reading & writing tech blogs whenever possible.`,
    `🍕   Meetups & tech events ( *with bonus beers* ).`
];
const favorites = favoritesConfigs.reduce((result, fact) => result + `\n - ${fact}`, '');

const toolsTitle = generateTitle(2, `:rocket: Some Tools I Use`)
const toolsIconSize = 25;
const toolsConfig = [{
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain.svg',
        alt: 'bootstrap',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg',
        alt: '.NET',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg',
        alt: 'mysql',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg',
        alt: 'redis',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg',
        alt: 'nginx',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/travis/travis-plain.svg',
        alt: 'travis',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
        alt: 'Docker',
    },
    {
        src: 'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg',
        alt: 'Kubernetes',
    },
];
const tools = toolsConfig.reduce((result, toolConfig) => result + '\n' + generateIcon(toolConfig, toolsIconSize), '');

const stats = `<img src="https://github-readme-stats.vercel.app/api?username=thomas-illiet&show_icons=true&count_private=true"/>`;

const visitors = `![visitors](https://visitor-badge.glitch.me/badge?page_id=thomas-illiet.thomas-illiet)`;

(async() => {

    const content = `${introTitle}\n
${introDescription}\n
${badges}\n
${gif}\n
${factsTitle}\n
${facts}\n
${favoritesTitle}\n
${favorites}\n
${toolsTitle}\n
<p align="left">\n
    ${tools}\n
</p>\n
${stats}\n
${visitors}
`;

    const markdownContent = md.render(content);

    fs.writeFile('README.md', markdownContent, (err) => {
        if (err) {
            return console.error(err);
        }
        console.info(`Writing to README.md`);
    });
})();

function generateBadge(badgeConfig) {
    return `[![${badgeConfig.name} Badge](https://img.shields.io/badge/-${badgeConfig.badgeText}-${badgeConfig.labelBgColor}?style=flat-square&labelColor=${badgeConfig.logoBgColor}&logo=${badgeConfig.logo}&link=${badgeConfig.link})](${badgeConfig.link})`;
}

function generateIcon(iconConfig, toolsIconSize) {
    return `<img src="${iconConfig.src}" alt="${iconConfig.alt}" width="${toolsIconSize}" height="${toolsIconSize}" />`;
}

function generateTitle(size, title) {
    return `${'#'.repeat(size)} ${title}`;
}

function generateLink(label, link) {
    return `[${label}](${link})`;
}