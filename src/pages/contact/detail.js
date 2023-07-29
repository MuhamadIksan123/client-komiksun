import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import { getData } from '../../utils/fetch';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';


function ContactDetail() {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: '',
    email: '',
    isiPesan: '',
    date: '',
  });

  const fetchOneContact = async () => {
    const res = await getData(`/cms/contact/${contactId}`);

    setForm({
      ...form,
      nama: res.data.data.nama,
      email: res.data.data.email,
      isiPesan: res.data.data.isiPesan,
      date: moment(res.data.data.date).format('DD-MM-YYYY, h:mm:ss a'),
    });
  };

  useEffect(() => {
    fetchOneContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <BreadCrumb
        textSecound={'Contact'}
        urlSecound={'/contact'}
        textThird="Detail"
      />
      <div className="col-lg-8"></div>
      <div className="row mt-4 mb-3">
        <div className="col-lg-8">
          <div className="card">
            <h5 className="card-header">Detail Contact</h5>
            <div className="card-body">
              <h5 className="card-title">{form.nama}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{form.email}</h6>
              <p className="card-text">{form.isiPesan}</p>
              <p className="card-text">
                <small className="text-muted">{form.date}</small>
              </p>
              <Button
                action={() => navigate('/contact')}
                className="btn btn-primary"
              >
                Kembali
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetail;
