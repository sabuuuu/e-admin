import React from 'react';
import Select from 'react-select';

const EditableTable = ({ exams, setExams, profs, salles }) => {
  const handleInputChange = (e, index, field) => {
    const newExams = [...exams];
    newExams[index][field] = e.target.value;
    setExams(newExams);
  };

  const handleProfChange = (selectedOptions, examIndex) => {
    const selectedProfs = selectedOptions.map(option => option.value);
  
    setExams((prevExams) => {
      const newExams = [...prevExams];
      newExams[examIndex].profs = selectedProfs;
      return newExams;
    });
  };
  
  
  const handleSalleChange = (e, index) => {
    const newExams = [...exams];
    const selectedSalle = salles.find(salle => salle._id === e.target.value);
    newExams[index].salle = selectedSalle;
    return newExams;
  };

  const profOptions = profs.map(prof => ({ value: prof._id, label: prof.name }));

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#c7d2fe',
      borderRadius: '4px',
      padding: '0px',
      width: '100%',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#c7d2fe' : '#c7d2fe',
      color: state.isSelected ? '#02050C' : '#050C1A',
      fontSize: '0.8rem',
      '&:hover': {
        backgroundColor: '#6366f1',
        color: '#050C1A',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#e5e7eb',
      fontSize: '0.8rem',
    }),
  };

  return (
    <div className=' mx-auto'>
    <div className="w-full overflow-x-auto rounded-lg">
          <div className="align-middle inline-block min-w-full">
              <table className="min-w-full font-body ">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Module</th>
                <th className="px-6 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Date</th>
                <th className="px-6 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Horraire</th>
                <th className="px-36 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Enseignants</th>
                <th className="px-6 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">Local</th>
              </tr>
            </thead>
            <tbody className="bg-indigo-900 divide-y divide-gray-200">
              {exams.map((exam, index) => (
                <tr key={exam._id}>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <input
                      type="text"
                      value={exam.name}
                      onChange={(e) => handleInputChange(e, index, 'name')}
                      className="border border-gray-300 p-1 rounded bg-indigo-200 text-black"
                    />
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <input
                      type="date"
                      value={exam.date}
                      onChange={(e) => handleInputChange(e, index, 'date')}
                      className="border border-gray-300 p-1 rounded bg-indigo-200 text-black"
                    />
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <input
                      type="text"
                      value={exam.time}
                      onChange={(e) => handleInputChange(e, index, 'time')}
                      className="border border-gray-300 p-1 rounded bg-indigo-200 text-black"
                    />
                  </td>
                  <td className="px-3 w-full py-4 whitespace-nowrap">
                    <Select
                      options={profOptions}
                      isMulti
                      value={profOptions.filter(prof => exam.profs.includes(prof.value))}
                      onChange={(selectedOptions) => handleProfChange(selectedOptions, index)}
                      className="basic-multi-select w-full font-body rounded bg-indigo-200 text-black bg-opacity-20 focus:ring-indigo-900 focus:border-indigo-500 text-base outline-none leading-8 transition-colors duration-200 ease-in-out"
                      styles={{
                        ...customStyles,
                        control: (base) => ({
                          ...base,
                          borderColor: 'gray',
                          color: 'black',
                          backgroundColor: '#c7d2fe',
                          width: '100%',
                          fontSize: '0.8rem',
                        }),
                      }}
                    />
                  </td>
                  <td className="px-6  py-4 whitespace-nowrap">
              <select
                value={exam.salle._id}
                onChange={(e) => handleSalleChange(e, index)}
                className="border border-gray-300 p-1 rounded bg-indigo-200 text-black"
              >
                <option value="">Select Salle...</option>
                {salles.map(salle => (
                  <option key={salle._id} value={salle._id}>{salle.num} - {salle.type}</option>
                ))}
              </select>
            </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditableTable;
