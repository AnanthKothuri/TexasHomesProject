// InstancePage.js
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, ListGroup } from 'react-bootstrap';
import useFetchAll from '../hooks/usefetchAll';
import useFetchAllIds from '../hooks/useFetchAllIds';
import {useLocation} from 'react-router-dom';
// import GoogleMap from '../components/GoogleMap';


import './InstancePage.css'; // Make sure to create a corresponding CSS file
import InstanceCard from './InstanceCard';

const date_params = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

const HorizontalScrollList = ({items, type}) => {

  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: '10px' }}>
      {items.map(item => (
        <div
          key={item.id}
          style={{
            display: 'inline-block',
            // minWidth: '150px', // Set the minimum width for each item
            margin: 10,
            padding: 10
          }}
        >
          <InstanceCard item={item} type={type} />
        </div>
      ))}
    </div>
  );
};

function RelatedModels({ inputData }) {
  const { data: relatedCounties, loading: l1, error: e1 } = useFetchAllIds(
    'https://api.texashomesproject.me/counties',
    inputData.related_models.counties
  );
  const { data: relatedShelters, loading: l2, error: e2 } = useFetchAllIds(
    'https://api.texashomesproject.me/shelters',
    inputData.related_models.shelters
  );
  const { data: relatedEvents, loading: l3, error: e3 } = useFetchAllIds(
    'https://api.texashomesproject.me/events',
    inputData.related_models.events
  );

  // Check if any of the requests is still loading
  if (l1 || l2 || l3) return <div>Loading related models...</div>;

  // Check if any of the requests resulted in an error
  if (e1 || e2 || e3) {
    return <div>Error loading related models: {e1 || e2 || e3}</div>;
  }

  return (
    <div className="container" style={{ padding: 40 }}>

      {relatedCounties && relatedCounties.length > 0 && (
        <>
          <h2>Related Counties</h2>
          <HorizontalScrollList items={relatedCounties} type="Counties" />
        </>
      )}

      {relatedEvents && relatedEvents.length > 0 && (
        <>
          <h2>Related Events</h2>
          <HorizontalScrollList items={relatedEvents} type="Events" />
        </>
      )}

      {relatedShelters && relatedShelters.length > 0 && (
        <>
          <h2>Related Shelters</h2>
          <HorizontalScrollList items={relatedShelters} type="Shelters" />
        </>
      )}
    </div>
  );
}

const InstancePage = () => {
  const location = useLocation()
  const {item} = location.state;
  let { type, id } = useParams(); // Assuming the route is something like '/:type/:id'

  if (!item) {
    return <p>item is missing</p>
  }

  return (

    <div>
      { type === 'shelters' ? (<ShelterInstancePage item={item} />) : 
          type === 'counties' ? (<CountyInstancePage item={item} />) :
          <EventInstancePage item={item} />
      }

      <RelatedModels inputData={item} />

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
        <img src={"http://" + item.image_url} className="img-fluid rounded-start" alt={item.name}/>
      </div>

      <div class="col-md-4">
        <img src={"http://" + item.map} className="img-fluid rounded-end" alt={item.name}/>
      </div>
    </div>

    <div className="col-md-8" style={{margin: 20, maxWidth: '50rem'}}>
        <div className="card-body">
          <h5 className="card-title">Summary</h5>
          <p className="card-text">{item.description}</p>

          <h5 className="card-title">Demographics</h5>
          <p className="card-text">{item.text}</p>
        </div>
    </div>

    <Col md={8} style={{ margin: 20, maxWidth: '50rem' }}>
      <Card.Text className='row-attribute'>
            <p style={{fontWeight: 'bold', paddingRight: 10}}>Population</p>
            <p>{item.population.toLocaleString()}</p>
      </Card.Text>

      <Card.Text className='row-attribute'>
            <p style={{fontWeight: 'bold', paddingRight: 10}}>Housing Units</p>
            <p>{item.housing_units.toLocaleString()}</p>
      </Card.Text>

      <Card.Text className='row-attribute'>
          <p style={{fontWeight: 'bold', paddingRight: 10}}>Lat</p>
          <p>{item.lat}</p>
          <p style={{fontWeight: 'bold', paddingRight: 10, paddingLeft: 20}}>Long</p>
          <p>{item.long}</p>
      </Card.Text>
    </Col>

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
            <img src={item.image_url} className="img-fluid rounded-start" alt={item.name} />
          </Col>
          <Col>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe className="embed-responsive-item" src={item.video_url} allowfullscreen title={item.name}></iframe>
            </div>
          </Col>
          {item.map_url !== "" && (
            <Col md={4}>
              <img src={item.map_url} className="img-fluid rounded-start" alt={item.name} />
            </Col>
          )}
      </Row>


      <Col md={8} style={{ margin: 20, maxWidth: '50rem' }}>
        <Card.Body>
          <Card.Title>Description</Card.Title>
          <Card.Text><small className="text-body-secondary">{new Date(item.date_posted).toLocaleString('en-US', date_params)}</small></Card.Text>

          <Card.Text>{item.description}</Card.Text>
        </Card.Body>
      </Col>

      <Col md={8} style={{ margin: 20, maxWidth: '50rem' }}>
        <Card.Body>
          <Card.Text className='row-attribute'>
                <p style={{fontWeight: 'bold', paddingRight: 10}}>Organization</p>
                <p>{item.organization}</p>

          </Card.Text>

          <Card.Text className='row-attribute'>
                <p style={{fontWeight: 'bold', paddingRight: 10}}>Date Posted</p>
                <p>{new Date(item.date_posted).toLocaleString('en-US', date_params)}</p>
          </Card.Text>

          <Card.Text className='row-attribute'>
                <p style={{fontWeight: 'bold', paddingRight: 10}}>Address</p>
                <p>{item.address}</p>
          </Card.Text>

          <Card.Text className='row-attribute'>
              <p style={{fontWeight: 'bold', paddingRight: 10}}>Lat</p>
              <p>{item.lat}</p>
              <p style={{fontWeight: 'bold', paddingRight: 10, paddingLeft: 20}}>Long</p>
              <p>{item.long}</p>
          </Card.Text>

          <Card.Subtitle>Cause Areas</Card.Subtitle>
          <div className="row row-cols-auto">
              {item.cause_areas.length === 0 ? (
              <div>None</div>
              ) : (
                  item.cause_areas.map((item, index) => (
                      <p className="cause-item">{item}</p>
                  ))
              )}
          </div>
          
          {item.skills.length > 0 && (
            <>
              <Card.Subtitle>Skills</Card.Subtitle>
              <div className="row row-cols-auto">
                  {item.skills.length === 0 ? (
                  <div>None</div>
                  ) : (
                      item.skills.map((item, index) => (
                          <p className="skills-item">{item}</p>
                      ))
                  )}
              </div>
            </>
          )}

          {item.good_for.length > 0 && (
            <>
              <Card.Subtitle>Good For</Card.Subtitle>
              <div className="row row-cols-auto">
                  {item.good_for.length === 0 ? (
                  <div>None</div>
                  ) : (
                      item.skills.map((item, index) => (
                          <p className="good-for-item">{item}</p>
                      ))
                  )}
              </div>
            </>
          )}

          {item.requirements.length > 0 && (
            <>
              <Card.Subtitle>Requirements</Card.Subtitle>
              <div className="row row-cols-auto">
                  {item.requirements.length === 0 ? (
                  <div>None</div>
                  ) : (
                      item.skills.map((item, index) => (
                          <p className="requirements-item">{item}</p>
                      ))
                  )}
              </div>
            </>
          )}
        </Card.Body>
      </Col>

    </Container>
  );
}