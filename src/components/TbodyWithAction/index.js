import React from 'react';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { Image, Spinner } from 'react-bootstrap';
import moment from 'moment';
import { config } from '../../configs';
import axios from 'axios';

function TbodyWithAction({
  data,
  display,
  editUrl,
  deleteAction,
  customAction,
  actionNotDisplay,
  status,
}) {
  const navigate = useNavigate();
  const handleDownload = (data) => {
    console.log(data)
    return ;
    axios({
      url: `${config.api_image}/${data}`,
      method: 'GET',
      responseType: 'blob', // Menentukan respons sebagai blob (binary large object)
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf');
      document.body.appendChild(link);
      link.click();
    });
  };
  return (
    <tbody>
      {status === 'process' ? (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: 'center' }}>
            <div className="flex items-center justify-center">
              <Spinner animation="border" variant="primary" />
            </div>
          </td>
        </tr>
      ) : data.length ? (
        data.map((data, index) => {
          return (
            <tr key={index}>
              {Object.keys(data).map(
                (key) =>
                  display.indexOf(key) > -1 && (
                    <td key={key}>
                      {key === 'avatar' ? (
                        <Image
                          height={40}
                          width={40}
                          roundedCircle
                          src={`${config.api_image}/${data[key]}`}
                        />
                      ) : key === 'document' ? (
                        <button onClick={handleDownload(data[key])}>
                          Download PDF
                        </button>
                      ) : key === 'date' ? (
                        moment(data[key]).format('DD-MM-YYYY, h:mm:ss a')
                      ) : (
                        data[key]
                      )}
                    </td>
                  )
              )}
              {!actionNotDisplay && (
                <td>
                  {customAction && customAction(data._id, data.statusEvent)}
                  {editUrl && (
                    <Button
                      variant="success"
                      size={'sm'}
                      action={() => navigate(`${editUrl}/${data._id}`)}
                    >
                      Edit
                    </Button>
                  )}
                  {deleteAction && (
                    <Button
                      className={'mx-2'}
                      variant="danger"
                      size={'sm'}
                      action={() => deleteAction(data._id)}
                    >
                      Hapus
                    </Button>
                  )}
                </td>
              )}
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: 'center' }}>
            Tidak Ditemukan Data
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default TbodyWithAction;
