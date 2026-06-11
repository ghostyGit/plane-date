import { useState, useEffect } from 'react'
import { Heart, Calendar, MapPin, Utensils, Film, Music, Coffee, Sparkles, Share2 } from 'lucide-react'
import './App.css'

function App() {
  const [step, setStep] = useState('home')
  const [invitation, setInvitation] = useState({
    recipientName: '',
    senderName: '',
    dateType: '',
    date: '',
    time: '',
    location: '',
    message: '',
    invitationGifUrl: '',
    successGifUrl: ''
  })
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [yesScale, setYesScale] = useState(1)
  const [noClickCount, setNoClickCount] = useState(0)
  const [shareUrl, setShareUrl] = useState('')

  // Проверка URL параметров при загрузке
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const encodedData = params.get('data')
    
    if (encodedData) {
      try {
        const decodedData = JSON.parse(atob(encodedData))
        setInvitation(decodedData)
        setStep('invitation')
      } catch (e) {
        console.error('Ошибка декодирования данных:', e)
      }
    }
  }, [])

  const dateTypes = [
    { id: 'dinner', icon: Utensils, label: 'Ужин', color: '#f43f5e' },
    { id: 'movie', icon: Film, label: 'Кино', color: '#a855f7' },
    { id: 'coffee', icon: Coffee, label: 'Кофе', color: '#f59e0b' },
    { id: 'concert', icon: Music, label: 'Концерт', color: '#3b82f6' },
    { id: 'walk', icon: MapPin, label: 'Прогулка', color: '#22c55e' },
    { id: 'surprise', icon: Sparkles, label: 'Сюрприз', color: '#ec4899' }
  ]

  const handleCreateInvitation = () => {
    // Генерируем URL с закодированными данными
    const encodedData = btoa(JSON.stringify(invitation))
    const url = `${window.location.origin}${window.location.pathname}?data=${encodedData}`
    
    // Сохраняем ссылку в состояние и переходим на страницу с ссылкой
    setShareUrl(url)
    setStep('share')
  }

  const handleNoButtonClick = (e) => {
    setNoClickCount(prev => prev + 1)
    const maxX = window.innerWidth - 200
    const maxY = window.innerHeight - 100
    const newX = Math.random() * maxX - maxX / 2
    const newY = Math.random() * maxY - maxY / 2
    setNoButtonPosition({ x: newX, y: newY })
    setYesScale(prev => Math.min(prev + 0.3, 3))
  }

  const handleYesButtonClick = () => {
    setStep('success')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${invitation.senderName} приглашает тебя на свидание!`,
        text: invitation.message,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Ссылка скопирована!')
    }
  }

  if (step === 'home') {
    return (
      <div className="page home-page">
        <div className="background-elements">
          <div className="bg-circle circle-1"></div>
          <div className="bg-circle circle-2"></div>
          <div className="bg-circle circle-3"></div>
        </div>
        <div className="container">
          <div className="hero-section">
            <div className="heart-icon-wrapper">
              <div className="heart-glow"></div>
              {invitation.invitationGifUrl ? (
                <img src={invitation.invitationGifUrl} alt="Гифка" className="gif-image" />
              ) : (
                <Heart className="heart-icon" />
              )}
            </div>
            <h1 className="main-title">
              Самый веселый способ
              <span className="gradient-text">пригласить на свидание</span>
            </h1>
            <p className="main-description">
              Приглашение, которое они запомнят, покажут друзьям и будут обсуждать годами. 
              <span className="highlight">Одна ссылка. Секунды на создание.</span>
            </p>
            <div className="stats-card">
              <p className="stats-number">88,551+</p>
              <p className="stats-text">пар уже отправили свои приглашения</p>
            </div>
            <button className="main-button" onClick={() => setStep('create')}>
              Создать приглашение ✨
            </button>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <Calendar className="feature-icon" />
                </div>
                <h3 className="feature-title">Выбери дату</h3>
                <p className="feature-text">Выбери идеальную дату и время</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <Heart className="feature-icon" />
                </div>
                <h3 className="feature-title">Персонализируй</h3>
                <p className="feature-text">Добавь свои детали и сообщение</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <Share2 className="feature-icon" />
                </div>
                <h3 className="feature-title">Поделись</h3>
                <p className="feature-text">Отправь магическую ссылку</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'create') {
    return (
      <div className="page create-page">
        <div className="background-elements">
          <div className="bg-circle circle-1"></div>
          <div className="bg-circle circle-2"></div>
        </div>
        <div className="container">
          <div className="form-container">
            <button className="back-button" onClick={() => setStep('home')}>
              ← Назад
            </button>
            <div className="form-card">
              <h2 className="form-title">Создай приглашение ✨</h2>
              <div className="form-fields">
                <div className="form-group">
                  <label className="form-label">Имя получателя</label>
                  <input
                    type="text"
                    value={invitation.recipientName}
                    onChange={(e) => setInvitation({...invitation, recipientName: e.target.value})}
                    className="form-input"
                    placeholder="Кого приглашаешь?"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Твоё имя</label>
                  <input
                    type="text"
                    value={invitation.senderName}
                    onChange={(e) => setInvitation({...invitation, senderName: e.target.value})}
                    className="form-input"
                    placeholder="От кого приглашение?"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Тип свидания</label>
                  <div className="date-types-grid">
                    {dateTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <button
                          key={type.id}
                          onClick={() => setInvitation({...invitation, dateType: type.id})}
                          className={`date-type-button ${invitation.dateType === type.id ? 'selected' : ''}`}
                          style={invitation.dateType === type.id ? { backgroundColor: type.color } : {}}
                        >
                          <Icon className="date-type-icon" />
                          <span className="date-type-label">{type.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Дата</label>
                    <input
                      type="date"
                      value={invitation.date}
                      onChange={(e) => setInvitation({...invitation, date: e.target.value})}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Время</label>
                    <input
                      type="time"
                      value={invitation.time}
                      onChange={(e) => setInvitation({...invitation, time: e.target.value})}
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Место</label>
                  <input
                    type="text"
                    value={invitation.location}
                    onChange={(e) => setInvitation({...invitation, location: e.target.value})}
                    className="form-input"
                    placeholder="Где встречаемся?"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Сообщение</label>
                  <textarea
                    value={invitation.message}
                    onChange={(e) => setInvitation({...invitation, message: e.target.value})}
                    className="form-textarea"
                    placeholder="Напиши что-нибудь особенное..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">URL гифки для страницы приглашения (опционально)</label>
                  <input
                    type="text"
                    value={invitation.invitationGifUrl}
                    onChange={(e) => setInvitation({...invitation, invitationGifUrl: e.target.value})}
                    className="form-input"
                    placeholder="Вставь ссылку на гифку для страницы приглашения..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">URL гифки для страницы успеха (опционально)</label>
                  <input
                    type="text"
                    value={invitation.successGifUrl}
                    onChange={(e) => setInvitation({...invitation, successGifUrl: e.target.value})}
                    className="form-input"
                    placeholder="Вставь ссылку на гифку для страницы успеха..."
                  />
                </div>
                <button
                  onClick={handleCreateInvitation}
                  disabled={!invitation.recipientName || !invitation.senderName}
                  className="submit-button"
                >
                  Создать приглашение 💖
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'invitation') {
    const selectedType = dateTypes.find(t => t.id === invitation.dateType)
    const Icon = selectedType?.icon || Heart

    return (
      <div className="page invitation-page">
        <div className="background-elements">
          <div className="bg-circle circle-1"></div>
          <div className="bg-circle circle-2"></div>
          <div className="bg-circle circle-3"></div>
        </div>
        <div className="container">
          <div className="invitation-card">
            {invitation.invitationGifUrl && (
              <div className="invitation-gif-container">
                <img src={invitation.invitationGifUrl} alt="Гифка" className="invitation-gif-large" />
              </div>
            )}
            
            <h1 className="invitation-title">{invitation.recipientName}!</h1>
            <p className="invitation-text">
              {invitation.senderName} приглашает тебя на <span className="highlight">{selectedType?.label || 'свидание'}</span>!
            </p>
            {invitation.date && (
              <div className="date-card">
                <p className="date-text">
                  {new Date(invitation.date).toLocaleDateString('ru-RU', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                {invitation.time && <p className="time-text">{invitation.time}</p>}
              </div>
            )}
            {invitation.location && (
              <p className="location-text">
                <MapPin className="location-icon" />
                {invitation.location}
              </p>
            )}
            {invitation.message && (
              <p className="message-text">"{invitation.message}"</p>
            )}
            <div className="buttons-container">
              <button
                onClick={handleYesButtonClick}
                className="yes-button"
                style={{ transform: `scale(${yesScale})` }}
              >
                Да! 💖
              </button>
              <button
                onClick={handleNoButtonClick}
                className="no-button"
                style={{
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                Нет
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'share') {
    return (
      <div className="page share-page">
        <div className="background-elements">
          <div className="bg-circle circle-1"></div>
          <div className="bg-circle circle-2"></div>
        </div>
        <div className="container">
          <div className="share-card">
            <div className="share-icon-wrapper">
              <div className="share-icon-glow"></div>
              <Share2 className="share-icon-large" />
            </div>
            <h1 className="share-title">Приглашение готово! 🎉</h1>
            <p className="share-description">
              Скопируй ссылку и отправь её {invitation.recipientName}
            </p>
            <div className="share-url-container">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="share-url-input"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl).then(() => {
                    alert('Ссылка скопирована!')
                  })
                }}
                className="copy-button"
              >
                Копировать
              </button>
            </div>
            <button
              onClick={() => {
                setInvitation({
                  recipientName: '',
                  senderName: '',
                  dateType: '',
                  date: '',
                  time: '',
                  location: '',
                  message: '',
                  invitationGifUrl: '',
                  successGifUrl: ''
                })
                setShareUrl('')
                setStep('home')
              }}
              className="new-invitation-link"
            >
              Создать новое приглашение
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="page success-page">
        <div className="background-elements">
          <div className="bg-circle circle-1"></div>
          <div className="bg-circle circle-2"></div>
          <div className="bg-circle circle-3"></div>
        </div>
        <div className="confetti-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        <div className="container">
          <div className="success-card">
            {invitation.successGifUrl && (
              <div className="success-gif-container">
                <img src={invitation.successGifUrl} alt="Гифка" className="success-gif-large" />
              </div>
            )}
            <div className="success-icon-wrapper">
              <div className="success-icon-glow"></div>
              <Heart className="success-icon" />
            </div>
            <h1 className="success-title">Ура! 🎉</h1>
            <p className="success-text">
              {invitation.recipientName} сказала(а) <span className="highlight">ДА!</span>
            </p>
            <div className="details-card">
              <p className="details-text">
                Не забудь: {invitation.date && new Date(invitation.date).toLocaleDateString('ru-RU')}
                {invitation.time && ` в ${invitation.time}`}
              </p>
              {invitation.location && (
                <p className="details-location">
                  <MapPin className="location-icon" />
                  {invitation.location}
                </p>
              )}
            </div>
            <button onClick={handleShare} className="share-button">
              <Share2 className="share-icon" />
              Поделиться
            </button>
            <button
              onClick={() => {
                setStep('home')
                setInvitation({
                  recipientName: '',
                  senderName: '',
                  dateType: '',
                  date: '',
                  time: '',
                  location: '',
                  message: '',
                  invitationGifUrl: '',
                  successGifUrl: ''
                })
                setYesScale(1)
                setNoClickCount(0)
                setNoButtonPosition({ x: 0, y: 0 })
              }}
              className="new-invitation-link"
            >
              Создать новое приглашение
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
