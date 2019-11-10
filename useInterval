function useInterval(callback, delay) {
	const savedCallback: any = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	});

	useEffect(() => {
		function tick() {
			savedCallback.current();
		}

		let id = setInterval(tick, delay);
		return () => clearInterval(id);
	}, [delay]);
}

// Taken from Dan Abramov
