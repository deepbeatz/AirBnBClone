"use client";
import Button from "@/components/shared/Button";
import Heading from "@/components/shared/Heading";
import Input from "@/components/ui/inputs/Input";
import useLoginModel from "@/hooks/useLogInModel";
import useRegisterModel from "@/hooks/useRegisterModel";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Model from "./Model";

const LogInModel = () => {
	const router = useRouter();
	const registerModel = useRegisterModel();
	const LogInModel = useLoginModel();
	const [isLoading, setIsLoading] = useState(false);


	const RunBoth = useCallback(() => {
		LogInModel.onClose();
		registerModel.onOpen();
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
					<div>{`Don't have an Account?`}</div>
					<div
						onClick={RunBoth}
						className=" text-neutral-800 cursor-pointer hover:underline"
					>
						Sign Up
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Model
			disabled={isLoading}
			isOpen={LogInModel.isOpen}
			title="Log In"
			actionLabel="Continue"
			onClose={LogInModel.onClose}
			onSubmit={()=>{}}
			footer={FooterContent}
			available={true}
		/>
	);
};

export default LogInModel;
