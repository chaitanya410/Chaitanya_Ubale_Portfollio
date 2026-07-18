import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Typography,
  Container,
  Stack,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Chip,
  Fade,
  InputAdornment,
  Avatar,
  alpha,
  Skeleton,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import VendorModal from '../Modal/VendorModal';
import DateContainer from '../DateContainer/DateContainer';

interface User {
  Id: number;
  BUID: string;
  BUName: string;
  DueAmount: number;
}

interface Vendor {
  LedgerId: string;
  LedgerName?: string;
  LedgerOutStandingAmount: number;
  LedgerPrqAmt: number;
  Priority?: number;
}

const formatCurrency = (amount: number) =>
  `₹${Math.round(amount).toLocaleString('en-IN')}`;

interface RequestTableProps {
  id?: string;
}

const RequestTable: React.FC<RequestTableProps> = ({ id }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [users, setUsers] = useState<User[]>([]);
  const [selectedVendorData, setSelectedVendorData] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toBePaid, setToBePaid] = useState<Record<string, string | number>>({});
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Vendor Approval Dashboard';
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://vjbanking.vjerp.com/bank/getApprovalPendingData`
      );
      if (response.data.msg === 'success') {
        setUsers(response.data.data);
      }
    } catch (error) {
      toast.error('Error fetching approval data');
    } finally {
      setLoading(false);
    }
  };

  const openModal = async (vendor: User) => {
    setSelectedVendorData(vendor);
    setIsModalOpen(true);
    setLoading(true);

    try {
      const priorityRes = await axios.post(
        `https://vjbanking.vjerp.com/bank/fetchPriority`,
        { BUID: vendor.BUID }
      );

      if (priorityRes.data?.length > 0) {
        const updatedVendors = await Promise.all(
          priorityRes.data.map(async (v: Vendor) => {
            const res = await axios.post(
              `https://vjbanking.vjerp.com/bank/checkLedgerAmounts`,
              { LedgerId: v.LedgerId }
            );
            const ledger = res.data[0] || {};
            return {
              ...v,
              LedgerOutStandingAmount: ledger.LedgerOutStandingAmount || 0,
              LedgerPrqAmt: ledger.LedgerPrqAmt || 0,
            };
          })
        );
        setVendors(updatedVendors);
      }
    } catch (error) {
      toast.error('Error loading vendor details');
    } finally {
      setLoading(false);
    }
  };

  const totalDueAmount = useMemo(
    () => users.reduce((acc, user) => acc + (user.DueAmount || 0), 0),
    [users]
  );

  const totalToBePaid = useMemo(() => {
    return users.reduce((acc, user) => {
      const amount =
        toBePaid[user.BUID] !== undefined
          ? toBePaid[user.BUID]
          : user.DueAmount;
      return acc + parseFloat(String(amount) || '0');
    }, 0);
  }, [toBePaid, users]);

  const handleToBePaidChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    BUID: string,
    maxAmount: number
  ) => {
    const val = e.target.value.replace(/,/g, '');
    if (val === '' || (!isNaN(Number(val)) && parseFloat(val) <= maxAmount)) {
      setToBePaid((prev) => ({ ...prev, [BUID]: val }));
    }
  };

  const handleApprove = async (userId: number) => {
    const user = users.find((u) => u.Id === userId);
    if (!user) return;

    const amount =
      toBePaid[user.BUID] !== undefined
        ? toBePaid[user.BUID]
        : user.DueAmount;

    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://vjbanking.vjerp.com/bank/approvePayment`,
        {
          Id: userId,
          ApprovedAmount: amount,
        }
      );
      if (data.msg === 'success') {
        toast.success(`Approved: ${user.BUName}`);
        fetchData();
      }
    } catch (error) {
      toast.error('Approval failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = (user: User) => {
    toast.info(`Reject logic for ${user.BUName}...`);
  };

  // Premium Mobile Card Component
  const MobileCard = ({ user, index }: { user: User; index: number }) => (
    <Fade in timeout={300 + index * 50}>
      <Card
        sx={{
          mb: 2,
          borderRadius: 4,
          overflow: 'hidden',
          background: '#ffffff',
          border: '1px solid',
          borderColor: alpha('#0f172a', 0.06),
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {/* Card Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2.5,
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderBottom: '1px solid',
              borderColor: alpha('#0f172a', 0.04),
            }}
          >
            <Stack direction="row" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
                }}
              >
                <Typography variant="body2" fontWeight={700} color="white">
                  {String(index + 1).padStart(2, '0')}
                </Typography>
              </Box>
              <Box
                onClick={() => openModal(user)}
                sx={{ cursor: 'pointer' }}
              >
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color="text.primary"
                    sx={{
                      transition: 'color 0.2s',
                      '&:hover': { color: 'secondary.main' },
                    }}
                  >
                    {user.BUName}
                  </Typography>
                  <OpenInNewIcon sx={{ fontSize: 14, color: 'grey.400' }} />
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7 }}>
                  {user.BUID}
                </Typography>
              </Box>
            </Stack>
            <Chip
              label="Pending"
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 24,
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                color: '#92400e',
                border: '1px solid #fcd34d',
              }}
            />
          </Box>

          {/* Amount Section */}
          <Box sx={{ p: 2.5 }}>
            <Stack gap={2.5}>
              {/* Due Amount */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                  border: '1px solid',
                  borderColor: '#fecaca',
                }}
              >
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      background: 'rgba(220, 38, 38, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ReceiptLongIcon sx={{ color: '#dc2626', fontSize: 18 }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      Due Amount
                    </Typography>
                    <Typography variant="h6" fontWeight={800} color="#dc2626">
                      {formatCurrency(user.DueAmount)}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Amount Input */}
              <TextField
                fullWidth
                label="Amount to Pay"
                size="medium"
                value={
                  toBePaid[user.BUID] !== undefined
                    ? toBePaid[user.BUID]
                    : Math.round(user.DueAmount)
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleToBePaidChange(e, user.BUID, user.DueAmount)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography fontWeight={600} color="text.secondary">₹</Typography>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Action Buttons */}
              <Stack direction="row" gap={1.5}>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  size="large"
                  startIcon={<CheckCircleOutlineIcon />}
                  onClick={() => handleApprove(user.Id)}
                  sx={{
                    py: 1.5,
                    fontSize: '0.9rem',
                  }}
                >
                  Approve
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  size="large"
                  startIcon={<HighlightOffIcon />}
                  onClick={() => handleReject(user)}
                  sx={{
                    py: 1.5,
                    fontSize: '0.9rem',
                  }}
                >
                  Reject
                </Button>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <Stack gap={2}>
      {[1, 2, 3].map((i) => (
        <Card key={i} sx={{ borderRadius: 4, p: 2.5 }}>
          <Stack direction="row" gap={2} alignItems="center" mb={2}>
            <Skeleton variant="rounded" width={44} height={44} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="30%" height={16} />
            </Box>
          </Stack>
          <Skeleton variant="rounded" height={80} sx={{ mb: 2 }} />
          <Stack direction="row" gap={1.5}>
            <Skeleton variant="rounded" height={48} sx={{ flex: 1 }} />
            <Skeleton variant="rounded" height={48} sx={{ flex: 1 }} />
          </Stack>
        </Card>
      ))}
    </Stack>
  );

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Header Section */}
      <Fade in timeout={500}>
        <Box mb={4}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            gap={2}
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight={800}
                color="text.primary"
                sx={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Pending Approvals
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                {users.length} payment{users.length !== 1 ? 's' : ''} awaiting your review
              </Typography>
            </Box>
            <DateContainer />
          </Stack>
        </Box>
      </Fade>

      {/* Summary Cards */}
      <Fade in timeout={700}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          gap={2.5}
          mb={4}
        >
          <Card
            sx={{
              flex: 1,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(15, 23, 42, 0.3)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -40,
                left: -40,
                width: 160,
                height: 160,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.03)',
              }}
            />
            <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
              <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                <Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      opacity: 0.7, 
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    Total Due
                  </Typography>
                  <Typography 
                    variant="h4" 
                    fontWeight={800} 
                    mt={1}
                    sx={{ letterSpacing: '-0.02em' }}
                  >
                    {formatCurrency(totalDueAmount)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AccountBalanceWalletIcon sx={{ fontSize: 24, opacity: 0.9 }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card
            sx={{
              flex: 1,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(5, 150, 105, 0.3)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -40,
                left: -40,
                width: 160,
                height: 160,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
              }}
            />
            <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
              <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                <Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      opacity: 0.8, 
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    To Be Paid
                  </Typography>
                  <Typography 
                    variant="h4" 
                    fontWeight={800} 
                    mt={1}
                    sx={{ letterSpacing: '-0.02em' }}
                  >
                    {formatCurrency(totalToBePaid)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: 24, opacity: 0.9 }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Fade>

      {/* Main Content */}
      <Fade in timeout={900}>
        <Box>
          {loading && !isModalOpen ? (
            <LoadingSkeleton />
          ) : isMobile ? (
            // Mobile View
            <Box>
              {users.length === 0 ? (
                <Card sx={{ borderRadius: 4, p: 6, textAlign: 'center' }}>
                  <Typography color="text.secondary" fontWeight={500}>
                    No pending approvals
                  </Typography>
                </Card>
              ) : (
                users.map((user, index) => (
                  <MobileCard key={user.Id} user={user} index={index} />
                ))
              )}
            </Box>
          ) : (
            // Desktop View
            <Paper
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: alpha('#0f172a', 0.06),
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: 80 }}>#</TableCell>
                      <TableCell>Business Unit</TableCell>
                      <TableCell align="right">Due Amount</TableCell>
                      <TableCell align="center" sx={{ width: 200 }}>Amount to Pay</TableCell>
                      <TableCell align="center" sx={{ width: 300 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow 
                        key={user.Id}
                        sx={{
                          '&:last-child td': { borderBottom: 0 },
                        }}
                      >
                        <TableCell>
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: 2.5,
                              background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                              color: '#475569',
                            }}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            onClick={() => openModal(user)}
                            sx={{
                              cursor: 'pointer',
                              display: 'inline-block',
                            }}
                          >
                            <Stack direction="row" alignItems="center" gap={0.5}>
                              <Typography
                                variant="body1"
                                fontWeight={600}
                                color="text.primary"
                                sx={{
                                  transition: 'color 0.2s',
                                  '&:hover': { color: 'secondary.main' },
                                }}
                              >
                                {user.BUName}
                              </Typography>
                              <OpenInNewIcon sx={{ fontSize: 14, color: 'grey.400' }} />
                            </Stack>
                            <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7 }}>
                              {user.BUID}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body1" fontWeight={700} color="#dc2626">
                            {formatCurrency(user.DueAmount)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            size="small"
                            value={
                              toBePaid[user.BUID] !== undefined
                                ? toBePaid[user.BUID]
                                : Math.round(user.DueAmount)
                            }
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              handleToBePaidChange(e, user.BUID, user.DueAmount)
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography fontWeight={600} fontSize="0.85rem" color="text.secondary">
                                    ₹
                                  </Typography>
                                </InputAdornment>
                              ),
                            }}
                            sx={{ width: 150 }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" gap={1.5} justifyContent="center">
                            <Button
                              variant="contained"
                              color="success"
                              size="medium"
                              startIcon={<CheckCircleOutlineIcon />}
                              onClick={() => handleApprove(user.Id)}
                              sx={{ minWidth: 120 }}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="medium"
                              startIcon={<HighlightOffIcon />}
                              onClick={() => handleReject(user)}
                              sx={{ minWidth: 110 }}
                            >
                              Reject
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {users.length === 0 && (
                <Box sx={{ p: 6, textAlign: 'center' }}>
                  <Typography color="text.secondary" fontWeight={500}>
                    No pending approvals
                  </Typography>
                </Box>
              )}
            </Paper>
          )}
        </Box>
      </Fade>

      {/* Vendor Modal */}
      <VendorModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vendor={selectedVendorData}
        data={vendors}
      />
    </Container>
  );
};

export default RequestTable;
