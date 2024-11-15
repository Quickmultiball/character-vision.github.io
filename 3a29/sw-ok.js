/** This is a
 *
 *  ▄████▄   ██░ ██  ▄▄▄       ██▀███   ▄▄▄       ▄████▄  ▄▄▄█████▓▓█████  ██▀███
 * ▒██▀ ▀█  ▓██░ ██▒▒████▄    ▓██ ▒ ██▒▒████▄    ▒██▀ ▀█  ▓  ██▒ ▓▒▓█   ▀ ▓██ ▒ ██▒
 * ▒▓█    ▄ ▒██▀▀██░▒██  ▀█▄  ▓██ ░▄█ ▒▒██  ▀█▄  ▒▓█    ▄ ▒ ▓██░ ▒░▒███   ▓██ ░▄█ ▒
 * ▒▓▓▄ ▄██▒░▓█ ░██ ░██▄▄▄▄██ ▒██▀▀█▄  ░██▄▄▄▄██ ▒▓▓▄ ▄██▒░ ▓██▓ ░ ▒▓█  ▄ ▒██▀▀█▄
 * ▒ ▓███▀ ░░▓█▒░██▓ ▓█   ▓██▒░██▓ ▒██▒ ▓█   ▓██▒▒ ▓███▀ ░  ▒██▒ ░ ░▒████▒░██▓ ▒██▒
 * ░ ░▒ ▒  ░ ▒ ░░▒░▒ ▒▒   ▓▒█░░ ▒▓ ░▒▓░ ▒▒   ▓▒█░░ ░▒ ▒  ░  ▒ ░░   ░░ ▒░ ░░ ▒▓ ░▒▓░
 *   ░  ▒    ▒ ░▒░ ░  ▒   ▒▒ ░  ░▒ ░ ▒░  ▒   ▒▒ ░  ░  ▒       ░     ░ ░  ░  ░▒ ░ ▒░
 * ░         ░  ░░ ░  ░   ▒     ░░   ░   ░   ▒   ░          ░         ░     ░░   ░
 * ░ ░       ░  ░  ░      ░  ░   ░           ░  ░░ ░                  ░  ░   ░
 * ░                                             ░
 *
 * Created initially by rischko on 18.09.19.
 *
 *
 */
var urlsToCache = [];

var CACHE_NAME = 'brrrrb';

// Cache posts
// Limits the number of posts that gets cached to 3
// Reads a piece of front-matter in each post that directs the second loop to the folder where the assets are held
{% for post in site.posts limit:3 %}
urlsToCache.push("{{ post.url }}")
{% for file in site.static_files %}
{% if file.path contains post.assets %}
urlsToCache.push("{{ file.path }}")
{% endif %}
{% endfor %}
{% endfor %}

// Cache pages
// Do nothing if it's either an AMP page (as these are served via Googles cache) or the blog page
// Fallback to the offline pages for these
{% for page in site.html_pages %}
{% if page.path contains 'amp-html' or page.path contains 'blog' %}
{% else if %}
urlsToCache.push("{{ page.url }}")
{% endif %}
{% endfor %}

// Cache assets
// Removed assets/posts because I only want assets from the most recent posts getting cached
{% for file in site.static_files %}
{% if file.extname == '.js' or file.extname == '.css' or file.extname == '.jpg' or file.extname == '.png' or file.extname == '.json' %}
urlsToCache.push("{{ file.path }}")
console.log("{{ file.path }}");
{% endif %}
{% endfor %}
