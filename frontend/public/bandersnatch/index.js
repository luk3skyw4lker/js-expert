const MANIFEST_URL = 'manifest.json';
const localhost = ['127.0.0.1', 'locahost'];

async function main() {
	const isLocal = !!~localhost.indexOf(window.location.hostname);
	const manifest = await (await fetch(MANIFEST_URL)).json();
	const host = isLocal ? manifest.localHost : manifest.productionHost;

	const videoComponent = new VideoComponent();
	const videoPlayer = new VideoPlayer({ manifest });

	videoComponent.intializePlayer();
	videoPlayer.initializeCodec();
}

window.onload = main;
