import { useAuthStore } from "../../store/authStore";
import { confirm } from "../../store/helpers";

import logo from "../../img/logo.svg";

import styles from "./Header.module.scss";
import type { MouseEventHandler } from "react";

export const Header = function () {
	const isLogin = useAuthStore((state) => state.isLogin);
	const email = useAuthStore((state) => state.email);

	const logout = useAuthStore((state) => state.logout);

	const handleLogout: MouseEventHandler<HTMLAnchorElement> = async (e) => {
		e.preventDefault();

		const ok = await confirm("Are you sure you want to log out?");
		if (!ok) {
			return;
		}

		logout();
	};

	return (
		<>
			<header className={styles["header"]}>
				<img src={logo} alt="logo" className="header__logo" />

				{isLogin && (
					<div className={styles["header__user"]}>
						<div className={styles["header__user__display"]}>
							<div className={styles["header__user__avatar"]}>
								<p className={styles["header__user__avatar__initial"]}>{email?.slice(0, 1).toUpperCase()}</p>
							</div>

							<p className={styles["header__user__email"]}>{email}</p>
						</div>
						<a href="" className={styles["header__user__logout"]} onClick={handleLogout}>
							Log out
						</a>
					</div>
				)}
			</header>
		</>
	);
};
