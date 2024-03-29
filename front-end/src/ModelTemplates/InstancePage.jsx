// InstancePage.js
import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col } from 'react-bootstrap';
import useFetchAllIds from '../hooks/useFetchAllIds';
import {useLocation} from 'react-router-dom';
import CustomGoogleMap from '../components/GoogleMap'


import './InstancePage.css';
import InstanceCard from './InstanceCard';
import LoadingPage from '../components/LoadingPage';
import Colors from '../assets/Colors';

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
  if (l1 || l2 || l3) return <LoadingPage/>;

  // Check if any of the requests resulted in an error
  if (e1 || e2 || e3) {
    return <div>Error loading related models: {e1 || e2 || e3}</div>;
  }

  return (
    <div className="container" style={{marginLeft: '10%', marginRight: '10%', marginTop: 30}}>

      {relatedCounties && relatedCounties.length > 0 && (
        <>
          <Row xs="auto" style={{alignItems: 'center'}}>
            <Col> <h2 style={{fontFamily: 'NotoSans-SemiBold', fontSize: 25}}>Related Counties</h2> </Col>
            <Col> <h3 style={{color: 'lightgray', fontFamily: 'NotoSans', fontSize: 25}}>{relatedCounties.length}</h3> </Col>
          </Row>
          <HorizontalScrollList items={relatedCounties} type="Counties" />
        </>
      )}

      {relatedEvents && relatedEvents.length > 0 && (
        <>
          <Row xs="auto" style={{alignItems: 'center'}}>
            <Col> <h2 style={{fontFamily: 'NotoSans-SemiBold', fontSize: 25}}>Related Events</h2> </Col>
            <Col> <h3 style={{color: 'lightgray', fontFamily: 'NotoSans', fontSize: 25}}>{relatedEvents.length}</h3> </Col>
          </Row>
          <HorizontalScrollList items={relatedEvents} type="Events" />
        </>
      )}

      {relatedShelters && relatedShelters.length > 0 && (
        <>
            <Row xs="auto" style={{alignItems: 'center'}}>
            <Col> <h2 style={{fontFamily: 'NotoSans-SemiBold', fontSize: 25}}>Related Shelters</h2> </Col>
            <Col> <h3 style={{color: 'lightgray', fontFamily: 'NotoSans', fontSize: 25}}>{relatedShelters.length}</h3> </Col>
          </Row>
          <HorizontalScrollList items={relatedShelters} type="Shelters" />
        </>
      )}
    </div>
  );
}

const InstancePage = () => {
  const location = useLocation()
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const {item} = location.state;
  let { type, id } = useParams(); // Assuming the route is something like '/:type/:id'
  const details = type === "shelters" ? [['Phone', item.phone_number], ['Email', item.email_address], ['Website', item.official_website], ['Facebook', item.facebook], ['Instagram', item.instagram], ['Twitter', item.twitter]] :
                  type === "counties" ? [['Website', item.website_url], ['Population', item.population.toLocaleString()], ['Housing Units', item.housing_units.toLocaleString()], ['Lat', item.lat], ['Long', item.long]] :
                  type === "events" ? [['Organization', item.organization], ['Date Posted', item.date_posted], ['Address', item.address], ['Lat', item.lat], ['Long', item.long]] :
                  []
  const title = type === "shelters" ? item.name : type === "counties" ? item.name : type === "events" ? item.title : ""
  const image = type === "shelters" ? item.photo_urls[0] : type === "counties" ? "http://" + item.image_url : type === "events" ? item.image_url : ""
  const description = type === "shelters" ? item.description : type === "counties" ? item.description : type === "events" ? item.description : ""
  const detail_lists = type === "events" ? [['Cause Areas', item.cause_areas], ['Skills', item.skills], ['Good For', item.good_for], ['Requirements', item.requirements]]: []
  const backHref = `/${type}`

  if (!item) {
    return <p>item is missing</p>
  }

  return (

    <div>
      <div style={{flexDirection: 'column', marginLeft: '10%', marginRight: '10%'}}>
        <div style={{fontSize: 20, margin: 25}}>
          <a href={backHref} className="back-button">Back to {type.charAt(0).toUpperCase() + type.slice(1)}</a>
        </div>

        <div className='image-container'>
          <img className='background-image' src={image} alt={title} />
          <div className="overlay"></div>
          <div className='title'>{title}</div>
        </div>

        <div style={{margin: 20, marginTop: 50}}>
          <p style={{fontFamily: 'NotoSans-SemiBold', fontSize: 25}}>Description</p>
          {/* <p style={{fontFamily: 'NotoSans', fontSize: 15}}>{item.official_website}</p> */}
          <div className={`${isExpanded ? 'description-expanded' : 'description-truncated'}`}>
            <p style={{fontFamily: 'NotoSans-Light', fontSize: 20}}>{description}</p>
          </div>
        </div>

        <div style={{fontSize: 30, fontFamily: "NotoSans-Light", marginLeft: 20}}>
          {isExpanded ? '' : '.  .  .'}
        </div>
        <button style={{backgroundColor: Colors.lightBlue, borderRadius: 10, borderWidth: 0, fontSize: 20, fontFamily: "NotoSans-Light", padding: 10, margin: 20}} 
                onClick={toggleExpand}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
        <Row>
              <Col style={{margin: 20}}>
                <p style={{fontFamily: 'NotoSans-SemiBold', fontSize: 25}}>Details</p>

                {details.map((detail, index) => (
                  <div key={index}>
                    <div style={{flexDirection: 'row', display: 'flex'}}>
                      <p style={{fontFamily: 'NotoSans', fontSize: 18, marginRight: 20}}>{detail[0]}: </p>
                      <p style={{fontFamily: 'NotoSans-Light', fontSize: 18}}>{detail[1]}</p>
                    </div>
                  </div>
                ))}

                {detail_lists.length !== 0 && (
                  detail_lists.map((list, index) => (
                    <div key={index}>
                      <div className="row row-cols-auto">
                      <p style={{ fontFamily: 'NotoSans', fontSize: 18, marginRight: 20 }}>{list[0]}: </p>
                        {list[1].length === 0 ? (
                          <p style={{ fontFamily: 'NotoSans-Light', fontSize: 18 }}>None</p>
                        ) : (
                          list[1].map((item, innerIndex) => (
                            <p key={innerIndex} style={{ fontFamily: 'NotoSans-Light', fontSize: 18 }}>{item}</p>
                          ))
                        )}
                      </div>
                    </div>
                  ))
                )}

              </Col>
              <Col>
                {/* <div className="embed-responsive embed-responsive-16by9">
                  <iframe className="embed-responsive-item" src={item.video_url} allowfullscreen title={item.name}></iframe>
                </div> */}
                <CustomGoogleMap latitude={item.lat} longitude={item.long}/>
              </Col>
        </Row>
      </div>

      <RelatedModels inputData={item} />

    </div>
  );
};

export default InstancePage;

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
              {/* <iframe className="embed-responsive-item" src={item.video_url} allowfullscreen title={item.name}></iframe> */}
              
            </div>
          </Col>
          {item.map_url !== "" ?(
            <Col md={4}>
              <img src={item.map_url} className="img-fluid rounded-start" alt={item.name} />
            </Col>
          ) : (
            <CustomGoogleMap latitude={item.lat} longitude={item.long}/>
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
