import { useState, useEffect } from 'react';
import { Search, Mail, MailOpen, Trash2, Archive } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../services/supabase';
import styles from './MessagesPage.module.css';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filter, setFilter] = useState('all'); // all, unread, read, archived
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [filter, searchTerm, messages]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    // Filtre par statut
    if (filter !== 'all') {
      filtered = filtered.filter(m => m.status === filter);
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.subject?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
  };

  const markAsRead = async (messageId) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ status: 'read' })
        .eq('id', messageId);

      if (error) throw error;
      fetchMessages();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!confirm('Voulez-vous vraiment supprimer ce message ?')) return;

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;
      fetchMessages();
      setSelectedMessage(null);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const archiveMessage = async (messageId) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ status: 'archived' })
        .eq('id', messageId);

      if (error) throw error;
      fetchMessages();
      setSelectedMessage(null);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const openMessage = (message) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      markAsRead(message.id);
    }
  };

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Chargement des messages...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.messagesPage}>
        <div className={styles.header}>
          <div>
            <h1>Messages</h1>
            <p>{messages.length} message(s) · {unreadCount} non lu(s)</p>
          </div>
        </div>

        {/* Filtres */}
        <div className={styles.filters}>
          <button 
            className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            Tous ({messages.length})
          </button>
          <button 
            className={`${styles.filterButton} ${filter === 'unread' ? styles.active : ''}`}
            onClick={() => setFilter('unread')}
          >
            Non lus ({messages.filter(m => m.status === 'unread').length})
          </button>
          <button 
            className={`${styles.filterButton} ${filter === 'read' ? styles.active : ''}`}
            onClick={() => setFilter('read')}
          >
            Lus ({messages.filter(m => m.status === 'read').length})
          </button>
          <button 
            className={`${styles.filterButton} ${filter === 'archived' ? styles.active : ''}`}
            onClick={() => setFilter('archived')}
          >
            Archivés ({messages.filter(m => m.status === 'archived').length})
          </button>
        </div>

        {/* Barre de recherche */}
        <div className={styles.searchBar}>
          <Search size={20} />
          <input
            type="text"
            placeholder="Rechercher un message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Liste des messages */}
        <div className={styles.messagesList}>
          {filteredMessages.length === 0 ? (
            <p className={styles.emptyState}>
              {searchTerm ? 'Aucun message trouvé' : 'Aucun message'}
            </p>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`${styles.messageItem} ${message.status === 'unread' ? styles.unread : ''}`}
                onClick={() => openMessage(message)}
              >
                <div className={styles.messageIcon}>
                  {message.status === 'unread' ? <Mail size={20} /> : <MailOpen size={20} />}
                </div>
                <div className={styles.messageContent}>
                  <div className={styles.messageHeader}>
                    <h4>{message.name}</h4>
                    <span className={styles.messageDate}>
                      {new Date(message.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className={styles.messageSubject}>{message.subject}</p>
                  <p className={styles.messagePreview}>
                    {message.message.substring(0, 80)}...
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal message */}
        {selectedMessage && (
          <div className={styles.modal} onClick={() => setSelectedMessage(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>{selectedMessage.subject}</h2>
                <div className={styles.modalActions}>
                  <button 
                    className={styles.iconButton}
                    onClick={() => archiveMessage(selectedMessage.id)}
                    title="Archiver"
                  >
                    <Archive size={18} />
                  </button>
                  <button 
                    className={styles.iconButtonDanger}
                    onClick={() => deleteMessage(selectedMessage.id)}
                    title="Supprimer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className={styles.messageDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>De :</span>
                  <span className={styles.detailValue}>
                    {selectedMessage.name} ({selectedMessage.email})
                  </span>
                </div>
                {selectedMessage.phone && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Téléphone :</span>
                    <span className={styles.detailValue}>{selectedMessage.phone}</span>
                  </div>
                )}
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Date :</span>
                  <span className={styles.detailValue}>
                    {new Date(selectedMessage.created_at).toLocaleString('fr-FR')}
                  </span>
                </div>
              </div>

              <div className={styles.messageBody}>
                {selectedMessage.message}
              </div>

              <div className={styles.modalFooter}>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className={styles.replyButton}
                >
                  Répondre par email
                </a>
                <button 
                  className={styles.closeButton}
                  onClick={() => setSelectedMessage(null)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}