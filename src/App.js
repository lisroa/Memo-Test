import "./App.css";
import { useEffect, useState } from "react";
import Board from "./components/Board/Board";
const emojiList = [..."💣🧤🎩🌮🎱🌶🍕🦖"];

const App = () => {
	const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
	const [selectedMemoBlock, setselectedMemoBlock] = useState(null);
	const [animating, setAnimating] = useState(false);

	const shuffleArray = (a) => {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	};

	const initializeGame = () => {
		const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
		setShuffledMemoBlocks(
			shuffledEmojiList.map((emoji, i) => ({ index: i, emoji, flipped: false }))
		);
		setselectedMemoBlock(null);
		setAnimating(false);
	};

	useEffect(() => {
		initializeGame();
	}, []);

	const handleMemoClick = (memoBlock) => {
		if (animating || memoBlock.flipped) return;

		const flippedMemoBlock = { ...memoBlock, flipped: true };
		let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
		shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
		setShuffledMemoBlocks(shuffledMemoBlocksCopy);

		if (selectedMemoBlock === null) {
			setselectedMemoBlock(memoBlock);
		} else if (selectedMemoBlock.emoji === memoBlock.emoji) {
			setselectedMemoBlock(null);
		} else {
			setAnimating(true);
			setTimeout(() => {
				shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
				shuffledMemoBlocksCopy.splice(
					selectedMemoBlock.index,
					1,
					selectedMemoBlock
				);
				setShuffledMemoBlocks(shuffledMemoBlocksCopy);
				setselectedMemoBlock(null);
				setAnimating(false);
			}, 1000);
		}
	};

	const resetGame = () => {
		initializeGame();
	};

	return (
		<div className="container">
			<Board
				memoBlocks={shuffledMemoBlocks}
				animating={animating}
				handleMemoClick={handleMemoClick}
			/>
			<div className="container-button">
				<button onClick={resetGame} className="button">
					Reiniciar Juego
				</button>
			</div>
		</div>
	);
};

export default App;
