const GITHUB_USERNAME = "Mgsslayer";
const GITLAB_USERNAME = "buildatech-esio.oboho";
const DAYS = 365;

async function fetchGithubCalendar() {
    const query = `
        query($login: String!) {
            user(login: $login) {
                contributionsCollection {
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                            }
                        }
                    }
                }
            }
        }
    `;

    const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${process.env.GITHUB_TOKEN}`,
            "User-Agent": "portfolio-heatmap"
        },
        body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME } })
    });

    if (!response.ok) {
        throw new Error(`GitHub API responded with ${response.status}`);
    }

    const json = await response.json();
    const weeks = json.data.user.contributionsCollection.contributionCalendar.weeks;

    const counts = {};
    weeks.forEach(week => {
        week.contributionDays.forEach(day => {
            counts[day.date] = day.contributionCount;
        });
    });
    return counts;
}

async function fetchGitlabCalendar() {
    const response = await fetch(`https://gitlab.com/users/${GITLAB_USERNAME}/calendar.json`, {
        headers: { "User-Agent": "portfolio-heatmap" }
    });

    if (!response.ok) {
        throw new Error(`GitLab API responded with ${response.status}`);
    }

    return response.json();
}

exports.handler = async function () {
    const [githubResult, gitlabResult] = await Promise.allSettled([
        fetchGithubCalendar(),
        fetchGitlabCalendar()
    ]);

    const githubCounts = githubResult.status === "fulfilled" ? githubResult.value : {};
    const gitlabCounts = gitlabResult.status === "fulfilled" ? gitlabResult.value : {};

    const days = [];
    const today = new Date();
    for (let i = DAYS - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const date = d.toISOString().slice(0, 10);
        days.push({
            date,
            github: githubCounts[date] || 0,
            gitlab: gitlabCounts[date] || 0
        });
    }

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600"
        },
        body: JSON.stringify({
            days,
            errors: {
                github: githubResult.status === "rejected" ? githubResult.reason.message : null,
                gitlab: gitlabResult.status === "rejected" ? gitlabResult.reason.message : null
            }
        })
    };
};
