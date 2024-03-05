// InstancePage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, ListGroup } from 'react-bootstrap';
import useFetchAll from '../hooks/usefetchAll';
// import GoogleMap from '../components/GoogleMap';


import './InstancePage.css'; // Make sure to create a corresponding CSS file


const InstancePage = () => {
  let { type, id } = useParams(); // Assuming the route is something like '/:type/:id'
  const { data: instanceData, loading, error } = useFetchAll('https://api.texashomesproject.me/' + type + '/' + id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!instanceData) {
    return <div className="instance-not-found">Instance not found</div>;
  }

  return (

    <div>
      { type === 'shelters' ? (<ShelterInstancePage item={instanceData} />) : 
          type === 'counties' ? (<CountyInstancePage item={instanceData} />) :
          <EventInstancePage item={instanceData} />
      }

      <div className='container' style={{padding: 40}}>
        <h1>Related</h1>
        <div class="row row-cols-auto">

        </div>
      </div>
    </div>
  );
};

export default InstancePage;

function ShelterInstancePage({item}) {
  return (
    <Container className="centered-container" style={{ flex: 1, flexDirection: 'column' }}>

      <Card className="text-center" style={{ margin: 40, width: '50rem' }}>
        <Card.Header>Shelter</Card.Header>
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.address}</Card.Text>
          <a href="/shelters" className="btn btn-primary">Back to Shelters</a>
        </Card.Body>
        <Card.Footer className="text-body-secondary">
          {item.city}, {item.state} {item.zip_code}
        </Card.Footer>
      </Card>

      <Row style={{ maxWidth: '50rem'}}>
            <Col md={4}>
                <img src={item.photo_urls[0]} className="img-fluid rounded-start" alt={item.name} />
            </Col>
            <Col>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={item.video_url} allowfullscreen title={item.name}></iframe>
              </div>
            </Col>
      </Row>


      <Col md={8} style={{ margin: 20, maxWidth: '50rem' }}>
        <Card.Body>
          <Card.Title>Description</Card.Title>
          <Card.Text><small className="text-body-secondary">{item.official_website}</small></Card.Text>

          <Card.Text>{item.description}</Card.Text>
          <Card.Text><small className="text-body-secondary">Last updated {item.update_datetime}</small></Card.Text>
        </Card.Body>
      </Col>

      <ListGroup style={{ margin: 40 }}>
        <ListGroup.Item disabled aria-current="true">Contact</ListGroup.Item>
        <ListGroup.Item>Phone: {item.phone_number}</ListGroup.Item>
        <ListGroup.Item>Email: {item.email_address}</ListGroup.Item>
        <ListGroup.Item>Fax: {item.fax_number}</ListGroup.Item>
        <ListGroup.Item>Twitter: {item.twitter}</ListGroup.Item>
        <ListGroup.Item>Facebook: {item.facebook}</ListGroup.Item>
        <ListGroup.Item>Instagram: {item.instagram}</ListGroup.Item>
        <ListGroup.Item>Coordinates: {item.coordinate}</ListGroup.Item>
      </ListGroup>

    </Container>
  );
}

function CountyInstancePage({item}) {
  return (
  <div className="centered-container" style={{flex: 1, flexDirection: 'column'}}>

    <div className="card text-center" style={{margin: 40, width: '50rem'}}>
      <div className="card-header">
        County
      </div>
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.short_description}</p>
        <a href="/counties" className="btn btn-primary">Back to Counties</a>
      </div>
      <div className="card-footer text-body-secondary">
        {item.website_url}
      </div>
    </div>

    <div className="row" style={{maxWidth: '50rem'}}>
      <div className="col-md-4">
        <img src={item.image_url} className="img-fluid rounded-start" alt={item.name}/>
      </div>

      <div class="col-md-4">
        <img src={item.map} className="img-fluid rounded-end" alt={item.name}/>
      </div>
    </div>

    <div className="col-md-8" style={{margin: 20, maxWidth: '50rem'}}>
        <div className="card-body">
          <h5 className="card-title">Summary</h5>
          <p className="card-text">{item.long_description}</p>
          <p className="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
    </div>

    <ul className="list-group" style={{margin: 40}}>
      <li className="list-group-item disabled" aria-current="true">Statistics</li>
      <li className="list-group-item">Population: {item.population}</li>
      <li className="list-group-item">Housing Units: {item.housing}</li>
    </ul>
  </div>
  )
}

function EventInstancePage({item}) {
  return (
    <Container className="centered-container" style={{ flex: 1, flexDirection: 'column' }}>

      <Card className="text-center" style={{ margin: 40, width: '50rem' }}>
        <Card.Header>Event</Card.Header>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.organization}</Card.Text>
          <a href="/events" className="btn btn-primary">Back to Events</a>
        </Card.Body>
        <Card.Footer className="text-body-secondary">
          {item.location}
        </Card.Footer>
      </Card>

      <Row style={{ maxWidth: '50rem'}}>
          <Col md={4}>
            <img src={item.image} className="img-fluid rounded-start" alt={item.name} />
          </Col>
            <Col>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={item.video_url} allowfullscreen title={item.name}></iframe>
              </div>
            </Col>
      </Row>


      <Col md={8} style={{ margin: 20, maxWidth: '50rem' }}>
        <Card.Body>
          <Card.Title>Description</Card.Title>
          <Card.Text><small className="text-body-secondary">{item.date_posted}</small></Card.Text>

          <Card.Text>{item.description}</Card.Text>
          <Card.Text><small className="text-body-secondary">Last updated {item.update_datetime}</small></Card.Text>
        </Card.Body>
      </Col>

      <ListGroup style={{ margin: 40 }}>
        <ListGroup.Item disabled aria-current="true">Details</ListGroup.Item>
        <ListGroup.Item>Date Posted: {item.date}</ListGroup.Item>
        <ListGroup.Item>Time: {item.time}</ListGroup.Item>
        <ListGroup.Item>Causes: {item.cause_areas}</ListGroup.Item>
        <ListGroup.Item>Skills: {item.skills}</ListGroup.Item>
        <ListGroup.Item>Requirements: {item.requirements}</ListGroup.Item>
      </ListGroup>

    </Container>
  );
}