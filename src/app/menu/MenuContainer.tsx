"use client";

import React from "react";
import { MenuProvider } from "./MenuContext";
import MenuButton from "./MenuButton";
import MenuOverlay from "./MenuOverlay";

export default function MenuContainer() {
    return (
        <MenuProvider>
            <MenuButton />
            <MenuOverlay />
        </MenuProvider>
    );
}
