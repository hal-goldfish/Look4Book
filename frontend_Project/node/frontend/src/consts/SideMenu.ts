import { SideMenuButtonProps } from "../components/molecules/SideMenuButton";
import Books from "../pages/Books";
import { BOOKS, SIGN_IN, SIGN_OUT, TOP_PAGE, USER_PROFILE } from "./PAGE";

export const SIDE_TOP_BUTTON: SideMenuButtonProps = {
    iconType: 'top',
    label: 'トップページ',
    url: TOP_PAGE,
};

export const SIDE_SIGNIN_BUTTON: SideMenuButtonProps = {
    iconType: 'signin',
    label: 'サインイン',
    url: SIGN_IN,
};

export const SIDE_SIGNOUT_BUTTON: SideMenuButtonProps = {
    iconType: 'signout',
    label: 'サインアウト',
    url: SIGN_OUT,
};

export const SIDE_PROFILE_BUTTON: SideMenuButtonProps = {
    iconType: 'userprofile',
    label: 'プロフィール',
    url: USER_PROFILE,
};

export const SIDE_BOOKS_BUTTON: SideMenuButtonProps = {
    iconType: 'books',
    label: '本棚',
    url: BOOKS,
}

export const menuListWhenSignIn: SideMenuButtonProps[] = [
    SIDE_TOP_BUTTON,
    SIDE_SIGNOUT_BUTTON,
    SIDE_PROFILE_BUTTON,
    SIDE_BOOKS_BUTTON,
]

export const menuListWhenSignOut: SideMenuButtonProps[] = [
    SIDE_TOP_BUTTON,
    SIDE_SIGNIN_BUTTON,
    SIDE_PROFILE_BUTTON,
    SIDE_BOOKS_BUTTON,
]
