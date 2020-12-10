class VideoPlayer {
	constructor({ manifest }) {
		this.manifest = manifest;
		this.videoElement = null;
		this.sourceBuffer = null;
		this.selected = {};
	}

	initializeCodec() {
		this.videoElement = document.getElementById('vid');

		const mediaSourceSupport = !!window.MediaSource;

		if (!mediaSourceSupport) {
			alert('O seu browser ou sistema não tem suporte a MSE');

			return;
		}

		const codecSupport = MediaSource.isTypeSupported(this.manifest.codec);

		if (!codecSupport) {
			alert('Codec não suportado');

			return;
		}

		const mediaSource = new MediaSource();

		this.videoElement.src = URL.createObjectURL(mediaSource);

		mediaSource.addEventListener(
			'sourceopen',
			this.sourceOpenWrapper(mediaSource)
		);
	}

	sourceOpenWrapper(mediaSource) {
		return async _ => {
			this.sourceBuffer = mediaSource.addSourceBuffer(this.manifest.codec);

			const selected = (this.selected = this.manifest.intro);

			mediaSource.duration = 0;
		};
	}

	async fileDownload(url) {
		const prepareUrl = {};
	}
}
