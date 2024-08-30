"use client";

import EmptyState from "@/components/shared/EmptyState";
import { useEffect } from "react";

interface ErrorProps {
	error: Error;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
	useEffect(() => {
		console.log(error);
	}, [error]);

	return <EmptyState title="Uh Oh..." subtitle="Something went wrong" />;
};

export default Error;
