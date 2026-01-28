import { useState } from 'react'

function FindDoctors() {
  const [city, setCity] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)

  const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala']
  
  const specialties = [
    { id: 'general', name: 'General Physician' },
    { id: 'cardio', name: 'Cardiologist' },
    { id: 'skin', name: 'Dermatologist' },
    { id: 'eye', name: 'Eye Specialist' },
    { id: 'ent', name: 'ENT Specialist' },
    { id: 'ortho', name: 'Orthopedic' },
    { id: 'child', name: 'Pediatrician' },
    { id: 'dental', name: 'Dentist' },
    { id: 'neuro', name: 'Neurologist' },
    { id: 'gastro', name: 'Gastroenterologist' },
    { id: 'gynae', name: 'Gynecologist' },
    { id: 'urologist', name: 'Urologist' },
  ]

  // SAMPLE DATA - NOT REAL DOCTORS - For demo only
  const doctorsDB = [
    // LAHORE
    { id: 1, name: 'Dr. Ahmed Khan', specialty: 'general', hospital: 'Shaukat Khanum Hospital', city: 'Lahore', address: 'Johar Town', phone: '042-35905000', rating: 4.8, experience: '15 years', fee: 2000 },
    { id: 2, name: 'Dr. Fatima Malik', specialty: 'cardio', hospital: 'Punjab Institute of Cardiology', city: 'Lahore', address: 'Jail Road', phone: '042-99203051', rating: 4.9, experience: '20 years', fee: 3000 },
    { id: 3, name: 'Dr. Hassan Ali', specialty: 'skin', hospital: 'Hameed Latif Hospital', city: 'Lahore', address: 'Canal Bank', phone: '042-35761999', rating: 4.7, experience: '12 years', fee: 2500 },
    { id: 4, name: 'Dr. Ayesha Siddiqui', specialty: 'eye', hospital: 'LRBT Eye Hospital', city: 'Lahore', address: 'Ferozepur Road', phone: '042-35856000', rating: 4.8, experience: '18 years', fee: 1500 },
    { id: 5, name: 'Dr. Usman Tariq', specialty: 'ent', hospital: 'Mayo Hospital', city: 'Lahore', address: 'Anarkali', phone: '042-99211145', rating: 4.6, experience: '10 years', fee: 1000 },
    { id: 6, name: 'Dr. Sana Riaz', specialty: 'child', hospital: 'Children Hospital', city: 'Lahore', address: 'Ferozepur Road', phone: '042-99230127', rating: 4.9, experience: '14 years', fee: 1500 },
    { id: 7, name: 'Dr. Kashif Mahmood', specialty: 'ortho', hospital: 'Doctors Hospital', city: 'Lahore', address: 'Johar Town', phone: '042-35302701', rating: 4.7, experience: '16 years', fee: 2500 },
    { id: 8, name: 'Dr. Nadia Aslam', specialty: 'gynae', hospital: 'Fatima Memorial Hospital', city: 'Lahore', address: 'Shadman', phone: '042-37422271', rating: 4.8, experience: '19 years', fee: 2000 },
    { id: 9, name: 'Dr. Rizwan Ahmed', specialty: 'neuro', hospital: 'National Hospital', city: 'Lahore', address: 'DHA Phase 1', phone: '042-35712581', rating: 4.6, experience: '22 years', fee: 3500 },
    { id: 10, name: 'Dr. Samina Qadir', specialty: 'gastro', hospital: 'Surgimed Hospital', city: 'Lahore', address: 'Model Town', phone: '042-35887601', rating: 4.5, experience: '13 years', fee: 2500 },
    { id: 11, name: 'Dr. Farhan Saeed', specialty: 'dental', hospital: 'de Montmorency Dental', city: 'Lahore', address: 'Fort Road', phone: '042-37232061', rating: 4.4, experience: '8 years', fee: 1000 },
    { id: 12, name: 'Dr. Tariq Mehmood', specialty: 'urologist', hospital: 'Sheikh Zayed Hospital', city: 'Lahore', address: 'Canal Bank', phone: '042-35761230', rating: 4.7, experience: '17 years', fee: 3000 },
    // KARACHI
    { id: 13, name: 'Dr. Imran Sheikh', specialty: 'general', hospital: 'Aga Khan Hospital', city: 'Karachi', address: 'Stadium Road', phone: '021-111911911', rating: 4.9, experience: '22 years', fee: 4000 },
    { id: 14, name: 'Dr. Zainab Hussain', specialty: 'cardio', hospital: 'NICVD', city: 'Karachi', address: 'Rafiqui Shaheed Road', phone: '021-99201271', rating: 4.8, experience: '25 years', fee: 3500 },
    { id: 15, name: 'Dr. Bilal Ahmed', specialty: 'ortho', hospital: 'Liaquat National Hospital', city: 'Karachi', address: 'Stadium Road', phone: '021-111456456', rating: 4.7, experience: '16 years', fee: 3000 },
    { id: 16, name: 'Dr. Nadia Farooq', specialty: 'skin', hospital: 'Ziauddin Hospital', city: 'Karachi', address: 'Clifton', phone: '021-35862937', rating: 4.6, experience: '11 years', fee: 2500 },
    { id: 17, name: 'Dr. Saqib Rana', specialty: 'neuro', hospital: 'South City Hospital', city: 'Karachi', address: 'Clifton', phone: '021-35361461', rating: 4.8, experience: '18 years', fee: 4000 },
    { id: 18, name: 'Dr. Fariha Ali', specialty: 'gynae', hospital: 'Patel Hospital', city: 'Karachi', address: 'Gulshan-e-Iqbal', phone: '021-34821021', rating: 4.7, experience: '14 years', fee: 2500 },
    { id: 19, name: 'Dr. Adnan Malik', specialty: 'eye', hospital: 'LRBT Eye Hospital', city: 'Karachi', address: 'Korangi', phone: '021-35060731', rating: 4.9, experience: '20 years', fee: 1000 },
    { id: 20, name: 'Dr. Sadia Khan', specialty: 'child', hospital: 'Indus Hospital', city: 'Karachi', address: 'Korangi', phone: '021-111111880', rating: 4.9, experience: '15 years', fee: 0 },
    { id: 21, name: 'Dr. Junaid Akhtar', specialty: 'gastro', hospital: 'Dow University Hospital', city: 'Karachi', address: 'Ojha Campus', phone: '021-99261261', rating: 4.5, experience: '12 years', fee: 1500 },
    { id: 22, name: 'Dr. Kamran Ali', specialty: 'cardio', hospital: 'Tabba Heart Institute', city: 'Karachi', address: 'DHA Phase 2', phone: '021-35311411', rating: 4.9, experience: '24 years', fee: 5000 },
    // ISLAMABAD
    { id: 23, name: 'Dr. Kamran Aziz', specialty: 'general', hospital: 'PIMS Hospital', city: 'Islamabad', address: 'G-8', phone: '051-9261170', rating: 4.7, experience: '18 years', fee: 2000 },
    { id: 24, name: 'Dr. Mehwish Rana', specialty: 'cardio', hospital: 'Shifa International', city: 'Islamabad', address: 'H-8/4', phone: '051-8464646', rating: 4.9, experience: '20 years', fee: 4000 },
    { id: 25, name: 'Dr. Asad Mahmood', specialty: 'eye', hospital: 'Al-Shifa Eye Hospital', city: 'Islamabad', address: 'Jinnah Avenue', phone: '051-111000100', rating: 4.8, experience: '15 years', fee: 2000 },
    { id: 26, name: 'Dr. Saba Khalid', specialty: 'gynae', hospital: 'Maroof International', city: 'Islamabad', address: 'F-10', phone: '051-2112360', rating: 4.6, experience: '12 years', fee: 2500 },
    { id: 27, name: 'Dr. Naveed Iqbal', specialty: 'ortho', hospital: 'PIMS', city: 'Islamabad', address: 'G-8', phone: '051-9261170', rating: 4.7, experience: '17 years', fee: 2000 },
    { id: 28, name: 'Dr. Ayesha Naeem', specialty: 'child', hospital: 'Children Hospital', city: 'Islamabad', address: 'G-8', phone: '051-9261200', rating: 4.8, experience: '11 years', fee: 1500 },
    { id: 29, name: 'Dr. Shahbaz Ahmed', specialty: 'neuro', hospital: 'Quaid-e-Azam Hospital', city: 'Islamabad', address: 'F-8', phone: '051-8449100', rating: 4.9, experience: '23 years', fee: 4500 },
    { id: 30, name: 'Dr. Farah Deeba', specialty: 'skin', hospital: 'Kulsum Hospital', city: 'Islamabad', address: 'Blue Area', phone: '051-2870361', rating: 4.5, experience: '8 years', fee: 2500 },
    // RAWALPINDI  
    { id: 31, name: 'Dr. Rabia Noor', specialty: 'child', hospital: 'CMH Rawalpindi', city: 'Rawalpindi', address: 'CMH Complex', phone: '051-9270614', rating: 4.8, experience: '13 years', fee: 1500 },
    { id: 32, name: 'Dr. Tahir Abbas', specialty: 'general', hospital: 'Holy Family Hospital', city: 'Rawalpindi', address: 'Satellite Town', phone: '051-9290301', rating: 4.6, experience: '15 years', fee: 1000 },
    { id: 33, name: 'Dr. Naila Siddique', specialty: 'gynae', hospital: 'Benazir Bhutto Hospital', city: 'Rawalpindi', address: 'Murree Road', phone: '051-9290361', rating: 4.7, experience: '18 years', fee: 1500 },
    { id: 34, name: 'Dr. Asif Raza', specialty: 'cardio', hospital: 'Fauji Foundation Hospital', city: 'Rawalpindi', address: 'The Mall', phone: '051-9270984', rating: 4.8, experience: '20 years', fee: 2500 },
    { id: 35, name: 'Dr. Uzma Shabbir', specialty: 'eye', hospital: 'Al-Shifa Eye Hospital', city: 'Rawalpindi', address: 'Jhelum Road', phone: '051-9290877', rating: 4.9, experience: '16 years', fee: 1000 },
    // FAISALABAD
    { id: 36, name: 'Dr. Shahid Iqbal', specialty: 'general', hospital: 'Allied Hospital', city: 'Faisalabad', address: 'Abdullahpur', phone: '041-9210081', rating: 4.5, experience: '12 years', fee: 1000 },
    { id: 37, name: 'Dr. Amina Bibi', specialty: 'dental', hospital: 'Faisalabad Medical University', city: 'Faisalabad', address: 'Sargodha Road', phone: '041-2621617', rating: 4.6, experience: '8 years', fee: 800 },
    { id: 38, name: 'Dr. Nasir Mehmood', specialty: 'cardio', hospital: 'Faisalabad Institute of Cardiology', city: 'Faisalabad', address: 'Ghulam Muhammad Abad', phone: '041-9210445', rating: 4.7, experience: '19 years', fee: 2000 },
    { id: 39, name: 'Dr. Saira Jabeen', specialty: 'gynae', hospital: 'DHQ Hospital', city: 'Faisalabad', address: 'Jail Road', phone: '041-9200591', rating: 4.5, experience: '14 years', fee: 1200 },
    { id: 40, name: 'Dr. Imran Ali', specialty: 'child', hospital: 'Children Hospital', city: 'Faisalabad', address: 'Batala Colony', phone: '041-2302020', rating: 4.6, experience: '10 years', fee: 800 },
    // MULTAN
    { id: 41, name: 'Dr. Tariq Mehmood', specialty: 'cardio', hospital: 'Nishtar Hospital', city: 'Multan', address: 'Nishtar Road', phone: '061-9210078', rating: 4.7, experience: '19 years', fee: 1500 },
    { id: 42, name: 'Dr. Saima Akram', specialty: 'skin', hospital: 'Bakhtawar Amin Hospital', city: 'Multan', address: 'Abdali Road', phone: '061-4510092', rating: 4.5, experience: '10 years', fee: 1200 },
    { id: 43, name: 'Dr. Aslam Rana', specialty: 'general', hospital: 'Multan Institute of Kidney', city: 'Multan', address: 'Nishtar Road', phone: '061-9210301', rating: 4.6, experience: '15 years', fee: 1000 },
    { id: 44, name: 'Dr. Nazia Parveen', specialty: 'gynae', hospital: 'Women Hospital', city: 'Multan', address: 'Gulgasht Colony', phone: '061-9210456', rating: 4.8, experience: '17 years', fee: 1500 },
    { id: 45, name: 'Dr. Farhat Jabeen', specialty: 'child', hospital: 'Children Hospital Multan', city: 'Multan', address: 'Dera Adda', phone: '061-9210567', rating: 4.7, experience: '13 years', fee: 800 },
    // PESHAWAR
    { id: 46, name: 'Dr. Faisal Khan', specialty: 'ortho', hospital: 'Lady Reading Hospital', city: 'Peshawar', address: 'Hospital Road', phone: '091-9211430', rating: 4.6, experience: '14 years', fee: 1000 },
    { id: 47, name: 'Dr. Hina Gul', specialty: 'child', hospital: 'Khyber Teaching Hospital', city: 'Peshawar', address: 'University Road', phone: '091-9217140', rating: 4.7, experience: '11 years', fee: 800 },
    { id: 48, name: 'Dr. Ijaz Ahmad', specialty: 'general', hospital: 'Hayatabad Medical Complex', city: 'Peshawar', address: 'Hayatabad Phase 4', phone: '091-9217170', rating: 4.5, experience: '16 years', fee: 1000 },
    { id: 49, name: 'Dr. Sadia Bibi', specialty: 'gynae', hospital: 'Sardar Begum Hospital', city: 'Peshawar', address: 'Dabgari Gardens', phone: '091-2560351', rating: 4.8, experience: '18 years', fee: 1500 },
    { id: 50, name: 'Dr. Zahid Khan', specialty: 'cardio', hospital: 'Peshawar Institute of Cardiology', city: 'Peshawar', address: 'Hayatabad Phase 4', phone: '091-9217223', rating: 4.7, experience: '20 years', fee: 2000 },
    // QUETTA
    { id: 51, name: 'Dr. Abdul Sattar', specialty: 'general', hospital: 'Bolan Medical Complex', city: 'Quetta', address: 'Brewery Road', phone: '081-9202297', rating: 4.4, experience: '17 years', fee: 800 },
    { id: 52, name: 'Dr. Nasreen Kakar', specialty: 'gynae', hospital: 'Civil Hospital Quetta', city: 'Quetta', address: 'Jinnah Road', phone: '081-9202011', rating: 4.5, experience: '14 years', fee: 700 },
    { id: 53, name: 'Dr. Zahoor Ahmed', specialty: 'cardio', hospital: 'Quetta Institute of Medical', city: 'Quetta', address: 'Zarghoon Road', phone: '081-2823671', rating: 4.6, experience: '18 years', fee: 1500 },
    { id: 54, name: 'Dr. Farzana Baloch', specialty: 'child', hospital: 'Sandeman Hospital', city: 'Quetta', address: 'Jinnah Road', phone: '081-9202156', rating: 4.5, experience: '10 years', fee: 500 },
    // SIALKOT
    { id: 55, name: 'Dr. Akram Cheema', specialty: 'general', hospital: 'Allama Iqbal Hospital', city: 'Sialkot', address: 'Kashmir Road', phone: '052-4260241', rating: 4.5, experience: '13 years', fee: 800 },
    { id: 56, name: 'Dr. Sadia Aziz', specialty: 'gynae', hospital: 'Sardar Begum Hospital', city: 'Sialkot', address: 'Kutchery Road', phone: '052-4263031', rating: 4.6, experience: '11 years', fee: 1000 },
    { id: 57, name: 'Dr. Waqas Ali', specialty: 'ortho', hospital: 'Khawaja Safdar Medical', city: 'Sialkot', address: 'Khawaja Safdar Road', phone: '052-9250271', rating: 4.4, experience: '8 years', fee: 1000 },
    // GUJRANWALA
    { id: 58, name: 'Dr. Shafiq Ahmed', specialty: 'general', hospital: 'DHQ Hospital', city: 'Gujranwala', address: 'GT Road', phone: '055-9200691', rating: 4.4, experience: '14 years', fee: 700 },
    { id: 59, name: 'Dr. Rukhsana Bibi', specialty: 'gynae', hospital: 'Jinnah Hospital', city: 'Gujranwala', address: 'Civil Lines', phone: '055-3733211', rating: 4.6, experience: '16 years', fee: 1000 },
    { id: 60, name: 'Dr. Naveed Anjum', specialty: 'cardio', hospital: 'Gujranwala Institute of Cardiology', city: 'Gujranwala', address: 'Khiali Shahpur', phone: '055-9200901', rating: 4.7, experience: '17 years', fee: 1500 },
  ]

  const handleSearch = () => {
    let filtered = doctorsDB
    if (city) filtered = filtered.filter(d => d.city === city)
    if (specialty) filtered = filtered.filter(d => d.specialty === specialty)
    setResults(filtered)
    setSearched(true)
  }

  const getSpecialtyName = (id) => specialties.find(s => s.id === id)?.name || id

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-5">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Find Doctors</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Search doctors & hospitals in Pakistan</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 mb-5">
        <div className="flex gap-2">
          <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">Demo Data Only</p>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              For real verified doctors, visit <a href="https://www.marham.pk" target="_blank" rel="noopener noreferrer" className="underline font-medium">Marham.pk</a> or <a href="https://oladoc.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">oladoc.com</a>
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card p-4 mb-5">
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">City</label>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="input-field py-2.5">
              <option value="">All Cities</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Specialty</label>
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="input-field py-2.5">
              <option value="">All Specialties</option>
              {specialties.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={handleSearch} className="btn-primary w-full">Search</button>
          </div>
        </div>
      </div>

      {/* Quick Buttons */}
      <div className="flex flex-wrap gap-2 mb-5">
        {specialties.slice(0, 8).map(s => (
          <button key={s.id} onClick={() => { setSpecialty(s.id); setTimeout(handleSearch, 0); }} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${specialty === s.id ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'}`}>
            {s.name}
          </button>
        ))}
      </div>

      {/* Results */}
      {!searched ? (
        <div className="card p-8 text-center">
          <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Find Healthcare Providers</h3>
          <p className="text-sm text-gray-500">Select filters and click Search</p>
        </div>
      ) : results.length === 0 ? (
        <div className="card p-8 text-center">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">No Results</h3>
          <p className="text-sm text-gray-500">Try different filters</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">{results.length} doctors found</p>
          {results.map(doc => (
            <div key={doc.id} className="card p-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {doc.name.split(' ').slice(1).map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{doc.name}</h3>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400">{getSpecialtyName(doc.specialty)}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">
                      <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <span className="text-xs text-amber-700 dark:text-amber-300">{doc.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{doc.hospital}</p>
                  <p className="text-xs text-gray-500">{doc.address}</p>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">Rs. {doc.fee === 0 ? 'Free' : doc.fee}</span>
                    <span className="text-xs text-gray-500">{doc.experience}</span>
                    <div className="flex gap-2 ml-auto">
                      <a href={`tel:${doc.phone}`} className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-medium hover:bg-emerald-600">Call</a>
                      <a href={`https://www.google.com/maps/search/${encodeURIComponent(doc.hospital + ' ' + doc.city)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600">Map</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Emergency */}
      <div className="card mt-5 p-4 bg-gradient-to-r from-rose-500 to-red-600 border-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold text-sm">Emergency?</h3>
            <p className="text-rose-100 text-xs">Call Rescue 1122</p>
          </div>
          <a href="tel:1122" className="px-4 py-2 bg-white text-rose-600 rounded-xl text-sm font-semibold">Call 1122</a>
        </div>
      </div>
    </div>
  )
}

export default FindDoctors