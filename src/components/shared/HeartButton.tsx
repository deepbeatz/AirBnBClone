"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "@/types/Index";
import useFavorite from "@/hooks/useFavorite";

interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
	listingId,
	currentUser,
}) => {
	const { hasFavorite, toggleFavorite } = useFavorite({
		listingId,
		currentUser,
	});
	return (
		<div
			onClick={toggleFavorite}
			className="relative hover:opacity-80 transition cursor-pointer"
		>
			<AiOutlineHeart
				size={28}
				className="fill-white absolute -top-[2px] -right-[2px]"
			/>
			<AiFillHeart
				size={24}
				className={
					hasFavorite ? "fill-rose-600" : "fill-neutral-500/70"
				}
			/>
		</div>
	);
};

export default HeartButton;
