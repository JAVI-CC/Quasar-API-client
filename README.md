<p align="center"><img src="public/capturas/logo.png" width="400"></p>

<p>Quasar Framework with VueJs application web responsive and PWA that contains interface web, user registers and the application connected to a Laravel API <a href="https://laravelapijuegos.herokuapp.com/api/juegos" target="_blank"> https://laravelapijuegos.herokuapp.com</a></p>

<p>Project Laravel Api Server: <a href="https://github.com/JAVI-CC/Laravel-API-Server" target="_blank">https://github.com/JAVI-CC/Laravel-API-Server</a></p>

<h2>Start the app in the development mode</h2>
<pre><code>$ npm install && quasar dev -m pwa</code></pre>

<h2>Start the app in the production mode</h2>
<pre><code>$ npm install && quasar build -m pwa</code></pre>

<h2>Demo</h2>
<a href="https://quasar-api-client.vercel.app/" target="_blank">https://quasar-api-client.vercel.app/</a><br>
<span>User: admin@email.com</span><br>
<span>Password: 12345678</span>

<hr>

<h3>Show get all registries API SERVER:</h3>
<p align="center"><img src="/public/capturas/captura1.png"></p>

<h3>Login form:</h3>
<p align="center"><img src="/public/capturas/captura2.png"></p>

<h3>Create or update registrer sending it to the API SERVER:</h3>
<p align="center"><img src="/public/capturas/captura3.png"></p>

<h3>Application web responsive:</h3>
<p align="center"><img src="/public/capturas/captura_3.png"></p>

<h2>Deploy to Docker <g-emoji class="g-emoji" alias="whale" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f433.png">🐳</g-emoji></h2>

<h4>Setup:</h4>
<pre>
<code>$ git clone https://github.com/JAVI-CC/Quasar-API-client.git
$ cd Quasar-API-client
$ docker-compose up -d --build</code>
</pre>

<span>Once you have the containers deployed, you can access the API at </span> <a href="http://localhost:8080" target="_blank">http://localhost:8080</a>
