import { readFileSync } from 'fs';
import path from 'path';

function readTimeline(fileName) {
    try {
        return JSON.parse(readFileSync(path.join(process.cwd(), 'data', 'timeline', fileName)))
    } catch(err) {
        return []
    }
}

export default async function handler(req, res) {
    var covenant = readTimeline('covenant.json'),
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
                response[name].coming_soon.push(banner)
            }
            else {
                if (!dates[1]) {
                    return
                }
                
                var d2 = new Date(dates[1]).getTime();

                if (d2 > now) {
                    response[name].ongoing.push(banner)
                }
            }
        })
    })

    return res.end( JSON.stringify(response) );
}