
import Card from 'react-bootstrap/Card';

export default function YoutubeCard() {
    let index = Math.floor(Math.random() * 11)
    return (<Card style={{ width: '45rem', margin: '0 auto' }}>
        <div>
            <iframe width="720" height="405" src={"https://www.youtube.com/embed/?listType=playlist&list=PLDiFgzzSZgFjVQgvBsNTuM8WoSh9WT9Sx&index="+index} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>
    </Card>);
}
