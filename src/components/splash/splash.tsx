import { motion } from "framer-motion";
import React, { useContext } from "react";

import './splash.scss';
import AppContext from "../../app-context";

export const Splash = () => {
    const { loading } = useContext(AppContext);

    return (
        <motion.div>
            { loading && (
                <div className="Splash">
                    <motion.img animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity }}
                            src="kg_logo.png"
                            alt="Kocia Gęba Player" />
                    <h1>Loading...</h1>
                </div>
            )}
        </motion.div>
    );
}