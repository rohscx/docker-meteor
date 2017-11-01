import React, { PropTypes} from 'react';

const FileDownload = ({fileName, fileText}) => {
  let element = document.createElement('a');
  let file = new Blob([fileText],{type:'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = fileName;
  //element.setAttribute('href','data.text/plain;charset=utf-8,' + encodeURIComponent("fileText"));
  //element.setAttribute('download',"fileName.txt");

  //element.style.display = 'none';
  //document.body.appendChild(element);
  element.click();
  //document.body.removeChild(element);
}
/*
// checks type, throws and error
MgmtIp.propTypes = {
  role: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};
*/
export default FileDownload;
