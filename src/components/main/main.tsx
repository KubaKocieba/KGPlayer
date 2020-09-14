import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from 'react';
import { AxiosResponse } from "axios";
import { motion } from "framer-motion"

import './main.scss';

import axiosInstance from '../../endpoints/axios-instance-config';
import { ENDPOINTS } from "../../endpoints/endpoints";
import { MediaListVideo, MediaListResponse } from "../../interfaces/media-list.interfaces";
import { playerVariants, videoDescriptionMotion, videoElementMotion, videoTitleMotion } from "./framer-motion.variants";
import { Splash } from "../splash/splash";
import Videoplayer from "../videoplayer/videoplayer";
import Notification from "../notification/notification";
import AppContext from "../../app-context";

const Main: React.FC = () => {
    const { URL, CONFIG, DATA } = ENDPOINTS.MEDIALIST
    const { setToken } = useContext(AppContext);
    const SIGNOUT = ENDPOINTS.AUTH;
    const [videolist, setList] = useState<MediaListVideo[]>([]);
    const [selectedVideo, onVideoSelect] = useState<MediaListVideo>();
    const [mediaListError, setError] = useState<string>('');

    const moreDescription = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }

    const showList = () => videolist.map((video: MediaListVideo) => {
        return(

        <motion.div
            onClick={() => onVideoSelect(video)}
            variants={videoElementMotion}
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="MediaListVideo"
            key={video.Guid} id={video.Guid}
            itemID={video.Guid}>
            <div className="VideoTitle">
                <motion.h4 variants={videoTitleMotion}>
                    {video.Title} { video.Year ? `(${video.Year})` : ''}
                </motion.h4>
            </div>
            <div className="ImageContainer">
                {
                    !!video.Images[0] &&
                    (<img src={video.Images[0].Url}
                     alt={video.Title +'||' + video.Description} />)
                }
            </div>
            {   video.Description &&
                <motion.div variants={videoDescriptionMotion} className="VideoDescription">
                    <div className="Description">{video.Description}</div>
                    <Button variant="outlined" color="secondary" onClick={moreDescription}>MORE</Button>
                </motion.div>
            }
        </motion.div>
    )});

    const fetchMediaList = () => {
        axiosInstance.post<MediaListResponse>(URL, DATA, CONFIG).then(({ data }: AxiosResponse<MediaListResponse>) => {
            const { Entities } = data;
            setList([...videolist, ...Entities]);
        }).catch((error) => {
            setError('Something went wrong with loading Media List');
        });
    }

    const signOut = () => {
        // INSTRUCTIONS DIDN'T PROVIDE SUFFICIENT USR DATA, SO REQUEST WILL RESULT WITH 401
        axiosInstance.post(SIGNOUT.URL.SIGNOUT, {},SIGNOUT.CONFIG).then(() => {
            setToken(false);
            window.sessionStorage.clear();
        });
    }

    const handleVideoClose = () => {
        onVideoSelect(undefined);
    }

    useEffect(() => {
        fetchMediaList();
    }, []);

    return (
        <>
            <Splash />
            <Notification severity={'error'} message={mediaListError} setMessage={setError} />
            <div className="MainHeader">
                <div className="Header">
                    <img src="kg_logo.png" height="80%" width="auto" alt="Kocia Gęba Player"/>
                    <div>
                        <Button variant="outlined" color="secondary" onClick={signOut}>SIGN OUT</Button>
                    </div>
                </div>
                <h2>What you can watch...</h2>
            </div>
            <div className="MainContent">
                <div className="MediaList">
                    { showList() }
                </div>
            </div>
            <motion.div className="PlayerContainer" animate={ selectedVideo ? "open": "closed"} initial={"closed"} variants={playerVariants}>
                <Videoplayer closePlayer={handleVideoClose} selectedVideo={selectedVideo}/>
            </motion.div>
        </>
    );
}

export default Main;