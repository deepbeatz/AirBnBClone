"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModel from "@/hooks/useRegisterModel";
import Model from "./Model";
import Heading from "@/components/shared/Heading";
import Input from "@/components/ui/inputs/Input";
import { toast } from "react-hot-toast";
import Button from "@/components/shared/Button";
import useLoginModel from "@/hooks/useLogInModel";
import { signIn } from "next-auth/react";

const RegisterModel = () => {
	const registerModel = useRegisterModel();
	const LogInModel = useLoginModel();
	const [isLoading, setIsLoading] = useState(false);

	const RunBoth = useCallback(() => {
		registerModel.onClose();
		LogInModel.onOpen();
	}, [registerModel, LogInModel]);

	const FooterContent = (
		<div className="flex flex-col gap-4 mt-3">
			<Button
				outLine
				label="Continue with google"
				icon={FcGoogle}
				onClick={() => signIn("google")}
			/>
			<Button
				outLine
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => signIn("github")}
			/>
			<div className="text-neutral-500 flex text-center mt-4 font-light justify-center">
				<div className="flex flex-row items-center gap-2">
					<div>Already have an Account?</div>
					<div
						onClick={RunBoth}
						className=" text-neutral-800 cursor-pointer hover:underline"
					>
						Log In
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Model
			disabled={isLoading}
			isOpen={registerModel.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={registerModel.onClose}
			onSubmit={() => {}}
			available={true}
			footer={FooterContent}
		/>
	);
};

export default RegisterModel;
