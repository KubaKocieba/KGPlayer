import { Button } from "@material-ui/core";
import { motion, useCycle } from 'framer-motion';
import {
    Forward10Outlined,
    Forward30Outlined,
    Replay10Outlined,
    Replay30Outlined
} from "@material-ui/icons";
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from "react-player";

import './videoplayer.scss';
import axiosInstance from '../../endpoints/axios-instance-config';
import { MediaListVideo } from "../../interfaces/media-list.interfaces";
import { ENDPOINTS } from "../../endpoints/endpoints";
import Notification from "../notification/notification";

interface VideoPlayerProps {
    closePlayer: Function;
    selectedVideo: MediaListVideo | undefined;
}

const extraControlsMotion = {
    rest:{
        duration: 0.5,
        opacity: 0
    },
    show: {
        opacity: 1,
        duration: 0.5
    }
}

const Videoplayer: React.FC<VideoPlayerProps> = ({ closePlayer, selectedVideo}) => {
    const { URL } = ENDPOINTS.VIDEO;
    const [animate, cycle] = useCycle("rest", "show");
    const [controlsTimeOut, timeout] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [ videoLoadError, setVideoLoadError ] = useState('');
    const videoPlayer = useRef(null);

    const rewind = (seconds: number) => {
        // @ts-ignore
        clearTimeout(controlsTimeOut);
        timeout(null);

        if(videoPlayer && videoPlayer.current) {
            // @ts-ignore
            const now = videoPlayer.current.getCurrentTime();
            // @ts-ignore
            videoPlayer.current.seekTo(now + seconds);
        }

        // @ts-ignore
        timeout(setTimeout(() => cycle(), 3000));
    };

    const escapePress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closePlayer();
        }
    }

    const controlsShow = () => {
        if (animate === "rest") {
            cycle();
            // @ts-ignore
            timeout(setTimeout( () => cycle(), 3000));
        }
    };

    useEffect(() => {
        if (selectedVideo) {
            axiosInstance.get(`${URL}?mediaId=${selectedVideo.Id}`).then(({ data }) => {
               setVideoUrl(data.ContentUrl);
            }).catch((error) => {
                setVideoLoadError(error);
            });
        }
    }, [selectedVideo]);

    useEffect(() => {
        window.addEventListener('keydown', escapePress);

        return () => {
            window.removeEventListener('keydown', escapePress);
        }
    }, [])

    return (
        <div>
            <Notification message={videoLoadError} severity={'error'} setMessage={setVideoLoadError} />
            <motion.div onMouseEnter={controlsShow}
                        id="videoControls"
                        animate={animate}
                        variants={extraControlsMotion}>
                <div>
                    <Button id="closeButton"
                            variant="outlined"
                            color="secondary"
                            onClick={() => closePlayer()}>
                        Close
                    </Button>
                </div>
                <div className="NavButtons">
                    <Button variant="outlined"
                            color="secondary"
                            onClick={() => rewind(-10)} >
                        <Replay10Outlined></Replay10Outlined>
                    </Button>
                    <Button variant="outlined"
                            color="secondary"
                            onClick={() => rewind(-30)}>
                        <Replay30Outlined></Replay30Outlined>
                    </Button>
                    <Button variant="outlined"
                            color="secondary"
                            onClick={() => rewind(10)}>
                        <Forward10Outlined></Forward10Outlined>
                    </Button>
                    <Button variant="outlined"
                            color="secondary"
                            onClick={() => rewind(30)}>
                        <Forward30Outlined></Forward30Outlined>
                    </Button>
                </div>
            </motion.div>
            <div>
                <ReactPlayer
                    onPlay={controlsShow}
                    onPause={controlsShow}
                    ref={videoPlayer}
                    playing={!!videoUrl}
                    width={'100vw'}
                    height={'100vh'}
                    controls={true}
                    url={videoUrl} />
            </div>
        </div>
    );
}

export default Videoplayer;