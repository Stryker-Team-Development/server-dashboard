
import Card from 'react-bootstrap/Card';

export default function YoutubeCard() {
    
    return (<Card style={{ width: '45rem', margin: '0 auto' }}>
        <div>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLDiFgzzSZgFjVQgvBsNTuM8WoSh9WT9Sx" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>
    </Card>);
}
