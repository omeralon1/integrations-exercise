import GithubIcon from '../assets/icons/github.svg';
import SlackIcon from '../assets/icons/slack.svg';
import AwsIcon from '../assets/icons/aws.svg';
import MS365Icon from '../assets/icons/ms365.svg';

interface Platform {
    displayName: string;
    icon: string;
}

const platforms: Record<string, Platform> = {
    github: {
        displayName: 'GitHub',
        icon: GithubIcon
    },
    slack: {
        displayName: 'Slack',
        icon: SlackIcon
    },
    aws: {
        displayName: 'AWS',
        icon: AwsIcon
    },
    ms365: {
        displayName: 'MS365',
        icon: MS365Icon,
    }
};

const usePlatform = () => {
    const getPlatform = (platformId: string) => {
        return platforms[platformId];
    }

    return {
        getPlatform
    }
};

export default usePlatform;