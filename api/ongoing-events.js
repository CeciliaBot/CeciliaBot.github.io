import { readFileSync } from 'fs';
import path from 'path';

function readTimeline(fileName) {
    try {
        return JSON.parse(readFileSync(path.join(process.cwd(), 'data', 'timeline', fileName)))
    } catch(err) {
        return []
    }
}
function readDB(fileName) {
    try {
        return JSON.parse(readFileSync(path.join(process.cwd(), 'data', fileName)))
    } catch(err) {
        return {}
    }
}

function setHeroesAndArtifacts(banner, heroes, artifacts) {
    banner.c = (banner.c || []).map(hero => {
        var h = hero.id;
        return {
            id: heroes[h] || { id: h, _id: h, name: h, rarity: 1, attribute: 'fire', role: 'knight', tags: []},
            new: hero.new
        }
    })
    banner.a = (banner.a || []).map(artifact => {
        var a = artifact.id;
        return {
            id: artifacts[a] || { id: a, _id: a, name: a, rarity: 1, role: 'knight', tags: []},
            new: artifact.new
        }
    })
}

export default async function handler(req, res) {
    var heroes = readDB('HeroDatabase.json'),
        artifacts = readDB('artifacts.json'),
        covenant = readTimeline('covenant.json'),
        mystic = readTimeline('mystic.json'),
        powder = readTimeline('powder-shop.json'),
        covenant_coin = readTimeline('covenant-coin-shop.json'),
        galaxy_coin = readTimeline('galaxy-coin-shop.json'),
        response = {},
        now = Date.now();

    [
        ['covenant', covenant],
        ['mystic', mystic],
        ['powder', powder],
        ['covenant_coin', covenant_coin],
        ['galaxy_coin', galaxy_coin]
    ].forEach(collection => {
        var name = collection[0];
        var banners = collection[1];
        response[name] = {
            ongoing: [],
            coming_soon: []
        }

        banners.forEach(banner => {
            var dates = banner.dt;
            if (!dates || !dates.length) {
                return
            }
            
            var d1 = new Date(dates[0]).getTime();

            if (d1 > now) {
                setHeroesAndArtifacts(banner, heroes, artifacts)
                response[name].coming_soon.push(banner)
            }
            else {
                if (!dates[1]) {
                    return
                }
                
                var d2 = new Date(dates[1]).getTime();

                if (d2 > now) {
                    setHeroesAndArtifacts(banner, heroes, artifacts)
                    response[name].ongoing.push(banner)
                }
            }
        })
    })

    return res.end( JSON.stringify(response) );
}