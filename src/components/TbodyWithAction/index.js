import React from 'react';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { Image, Spinner } from 'react-bootstrap';
import moment from 'moment';
import { config } from '../../configs';
function TbodyWithAction({
  data,
  display,
  editUrl,
  detailUrl,
  deleteAction,
  customAction,
  actionNotDisplay,
  downloadAction,
  status,
  loading
}) {
  const navigate = useNavigate();
  return (
    <tbody>
      {status === 'process' || loading ? (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: 'center' }}>
            <div className="flex items-centerjustify-center">
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
                        <>{downloadAction && downloadAction(data.file._id)}</>
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
                  {detailUrl && (
                    <Button
                      className={'mx-2'}
                      variant="secondary"
                      size={'sm'}
                      action={() => navigate(`${detailUrl}/${data._id}`)}
                    >
                      Detail
                    </Button>
                  )}
                  {customAction &&
                    customAction(
                      data._id,
                      data.statusKomik ? data.statusKomik : (data.statusChapter ? data.statusChapter : (data.statusUser ? data.statusUser : data.statusTransaksi))
                    )}
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
