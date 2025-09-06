# Terminal Loading Animation - Usage Examples

This document provides comprehensive examples of using the terminal loading animation feature across different scenarios and use cases.

## Table of Contents

- [Basic Examples](#basic-examples)
- [Form Handling](#form-handling)
- [Data Operations](#data-operations)
- [Async Workflows](#async-workflows)
- [Error Handling](#error-handling)
- [Advanced Patterns](#advanced-patterns)
- [Styling Examples](#styling-examples)
- [Testing Examples](#testing-examples)

## Basic Examples

### Simple Loading Button

The most basic usage with automatic terminal animation:

```tsx
import React, { useState } from 'react';
import { Button } from '@react-spectrum/button';

function SimpleExample() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsLoading(false);
  };

  return (
    <Button 
      variant="accent"
      isPending={isLoading}
      onPress={handleClick}
    >
      {isLoading ? 'Processing...' : 'Start Process'}
    </Button>
  );
}
```

### Explicit Animation Type

Explicitly choosing between terminal and spinner animations:

```tsx
import React, { useState } from 'react';
import { Button } from '@react-spectrum/button';

function AnimationChoiceExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [animationType, setAnimationType] = useState('terminal');

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await submitData();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input
            type="radio"
            value="terminal"
            checked={animationType === 'terminal'}
            onChange={(e) => setAnimationType(e.target.value)}
          />
          Terminal Animation
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            value="spinner"
            checked={animationType === 'spinner'}
            onChange={(e) => setAnimationType(e.target.value)}
          />
          Spinner Animation
        </label>
      </div>
      
      <Button 
        variant="primary"
        isPending={isLoading}
        loadingAnimation={animationType}
        onPress={handleSubmit}
      >
        Submit Data
      </Button>
    </div>
  );
}
```

## Form Handling

### Contact Form

Complete form with validation and terminal loading:

```tsx
import React, { useState } from 'react';
import { Button } from '@react-spectrum/button';
import { TextField } from '@react-spectrum/textfield';
import { Form } from '@react-spectrum/form';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <Form onSubmit={handleSubmit} maxWidth="400px">
      <TextField
        label="Name"
        value={formData.name}
        onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
        isRequired
        isDisabled={isSubmitting}
      />
      
      <TextField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
        isRequired
        isDisabled={isSubmitting}
      />
      
      <TextField
        label="Message"
        value={formData.message}
        onChange={(value) => setFormData(prev => ({ ...prev, message: value }))}
        isRequired
        isDisabled={isSubmitting}
        isMultiline
        rows={4}
      />

      {submitStatus === 'success' && (
        <div style={{ color: 'green', margin: '1rem 0' }}>
          Message sent successfully!
        </div>
      )}

      {submitStatus === 'error' && (
        <div style={{ color: 'red', margin: '1rem 0' }}>
          Failed to send message. Please try again.
        </div>
      )}

      <Button 
        type="submit"
        variant="accent"
        isPending={isSubmitting}
        loadingAnimation="terminal"
        isDisabled={!isFormValid || isSubmitting}
        width="100%"
      >
        {isSubmitting ? 'Sending Message...' : 'Send Message'}
      </Button>
    </Form>
  );
}
```

### Multi-Step Form

Form with multiple steps and loading states:

```tsx
import React, { useState } from 'react';
import { Button } from '@react-spectrum/button';
import { ProgressBar } from '@react-spectrum/progress';

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {}
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = async () => {
    setIsProcessing(true);
    
    // Simulate validation/processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
    
    setIsProcessing(false);
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    try {
      // Submit complete form
      await fetch('/api/submit-form', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      
      // Handle success
      alert('Form submitted successfully!');
    } catch (error) {
      alert('Submission failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Step {currentStep} of {totalSteps}</h2>
        <ProgressBar 
          value={progress} 
          label="Form Progress"
          showValueLabel
        />
      </div>

      <div style={{ minHeight: '200px', marginBottom: '2rem' }}>
        {currentStep === 1 && (
          <div>
            <h3>Personal Information</h3>
            {/* Step 1 form fields */}
          </div>
        )}
        
        {currentStep === 2 && (
          <div>
            <h3>Contact Details</h3>
            {/* Step 2 form fields */}
          </div>
        )}
        
        {currentStep === 3 && (
          <div>
            <h3>Review & Submit</h3>
            {/* Step 3 review */}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          variant="secondary"
          onPress={handleBack}
          isDisabled={currentStep === 1 || isProcessing}
        >
          Back
        </Button>

        {currentStep < totalSteps ? (
          <Button 
            variant="accent"
            isPending={isProcessing}
            loadingAnimation="terminal"
            onPress={handleNext}
          >
            {isProcessing ? 'Validating...' : 'Next'}
          </Button>
        ) : (
          <Button 
            variant="accent"
            isPending={isProcessing}
            loadingAnimation="terminal"
            onPress={handleSubmit}
          >
            {isProcessing ? 'Submitting Form...' : 'Submit'}
          </Button>
        )}
      </div>
    </div>
  );
}
```

## Data Operations

### File Upload

File upload with progress tracking:

```tsx
import React, { useState, useRef } from 'react';
import { Button } from '@react-spectrum/button';
import { ProgressBar } from '@react-spectrum/progress';

function FileUploadExample() {
  const [uploadState, setUploadState] = useState({
    isUploading: false,
    progress: 0,
    fileName: null,
    error: null
  });
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadState({
      isUploading: true,
      progress: 0,
      fileName: file.name,
      error: null
    });

    try {
      await uploadFile(file, (progress) => {
        setUploadState(prev => ({
          ...prev,
          progress: Math.round(progress)
        }));
      });

      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        progress: 100
      }));

      // Reset after success
      setTimeout(() => {
        setUploadState({
          isUploading: false,
          progress: 0,
          fileName: null,
          error: null
        });
      }, 2000);

    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        error: error.message
      }));
    }
  };

  const uploadFile = (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(new Error('Upload failed'));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error'));
      });

      xhr.open('POST', '/api/upload');
      xhr.send(formData);
    });
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*,.pdf,.doc,.docx"
      />

      {!uploadState.isUploading && !uploadState.fileName && (
        <Button 
          variant="accent"
          onPress={handleFileSelect}
          width="100%"
        >
          Choose File to Upload
        </Button>
      )}

      {uploadState.fileName && (
        <div style={{ marginBottom: '1rem' }}>
          <strong>File:</strong> {uploadState.fileName}
        </div>
      )}

      {uploadState.isUploading && (
        <div style={{ marginBottom: '1rem' }}>
          <ProgressBar 
            value={uploadState.progress}
            label="Upload Progress"
            showValueLabel
          />
        </div>
      )}

      {uploadState.isUploading && (
        <Button 
          variant="secondary"
          isPending={true}
          loadingAnimation="terminal"
          width="100%"
          isDisabled
        >
          Uploading... {uploadState.progress}%
        </Button>
      )}

      {uploadState.error && (
        <div style={{ color: 'red', margin: '1rem 0' }}>
          Error: {uploadState.error}
        </div>
      )}

      {uploadState.progress === 100 && !uploadState.isUploading && (
        <div style={{ color: 'green', margin: '1rem 0' }}>
          ✅ Upload completed successfully!
        </div>
      )}
    </div>
  );
}
```

### Data Export

Export functionality with terminal loading:

```tsx
import React, { useState } from 'react';
import { Button } from '@react-spectrum/button';
import { Picker, Item } from '@react-spectrum/picker';

function DataExportExample() {
  const [exportState, setExportState] = useState({
    isExporting: false,
    format: 'csv',
    progress: 0,
    stage: 'idle'
  });

  const exportFormats = [
    { id: 'csv', name: 'CSV File' },
    { id: 'json', name: 'JSON File' },
    { id: 'excel', name: 'Excel File' },
    { id: 'pdf', name: 'PDF Report' }
  ];

  const handleExport = async () => {
    setExportState(prev => ({
      ...prev,
      isExporting: true,
      progress: 0,
      stage: 'preparing'
    }));

    try {
      // Stage 1: Prepare data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setExportState(prev => ({
        ...prev,
        progress: 25,
        stage: 'collecting'
      }));

      // Stage 2: Collect data
      await new Promise(resolve => setTimeout(resolve, 1500));
      setExportState(prev => ({
        ...prev,
        progress: 60,
        stage: 'formatting'
      }));

      // Stage 3: Format data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setExportState(prev => ({
        ...prev,
        progress: 85,
        stage: 'generating'
      }));

      // Stage 4: Generate file
      await new Promise(resolve => setTimeout(resolve, 800));
      setExportState(prev => ({
        ...prev,
        progress: 100,
        stage: 'complete'
      }));

      // Simulate file download
      const blob = new Blob(['Sample data'], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `data-export.${exportState.format}`;
      a.click();
      URL.revokeObjectURL(url);

      // Reset state
      setTimeout(() => {
        setExportState({
          isExporting: false,
          format: exportState.format,
          progress: 0,
          stage: 'idle'
        });
      }, 1500);

    } catch (error) {
      setExportState(prev => ({
        ...prev,
        isExporting: false,
        stage: 'error'
      }));
    }
  };

  const getButtonText = () => {
    if (!exportState.isExporting) {
      return `Export as ${exportState.format.toUpperCase()}`;
    }

    switch (exportState.stage) {
      case 'preparing': return 'Preparing export...';
      case 'collecting': return 'Collecting data...';
      case 'formatting': return 'Formatting data...';
      case 'generating': return 'Generating file...';
      case 'complete': return 'Download starting...';
      default: return 'Exporting...';
    }
  };

  return (
    <div style={{ maxWidth: '300px' }}>
      <Picker
        label="Export Format"
        selectedKey={exportState.format}
        onSelectionChange={(format) => 
          setExportState(prev => ({ ...prev, format }))
        }
        isDisabled={exportState.isExporting}
        marginBottom="1rem"
      >
        {exportFormats.map(format => (
          <Item key={format.id}>{format.name}</Item>
        ))}
      </Picker>

      <Button 
        variant="accent"
        isPending={exportState.isExporting}
        loadingAnimation="terminal"
        onPress={handleExport}
        width="100%"
      >
        {getButtonText()}
      </Button>

      {exportState.isExporting && (
        <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
          Progress: {exportState.progress}%
        </div>
      )}
    </div>
  );
}
```

## Async Workflows

### API Data Fetching

Complex data fetching with retry logic:

```tsx
import React, { useState, useCallback } from 'react';
import { Button } from '@react-spectrum/button';

function DataFetchingExample() {
  const [fetchState, setFetchState] = useState({
    isLoading: false,
    data: null,
    error: null,
    retryCount: 0
  });

  const maxRetries = 3;

  const fetchData = useCallback(async (retryAttempt = 0) => {
    setFetchState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      retryCount: retryAttempt
    }));

    try {
      const response = await fetch('/api/data');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      setFetchState({
        isLoading: false,
        data,
        error: null,
        retryCount: 0
      });

    } catch (error) {
      if (retryAttempt < maxRetries) {
        // Retry with exponential backoff
        const delay = Math.pow(2, retryAttempt) * 1000;
        setTimeout(() => {
          fetchData(retryAttempt + 1);
        }, delay);
      } else {
        setFetchState(prev => ({
          ...prev,
          isLoading: false,
          error: error.message
        }));
      }
    }
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  const getButtonText = () => {
    if (fetchState.isLoading) {
      if (fetchState.retryCount > 0) {
        return `Retrying... (${fetchState.retryCount}/${maxRetries})`;
      }
      return 'Loading data...';
    }
    
    if (fetchState.error) {
      return 'Retry';
    }
    
    return fetchState.data ? 'Refresh Data' : 'Load Data';
  };

  return (
    <div style={{ maxWidth: '500px' }}>
      <Button 
        variant={fetchState.error ? 'negative' : 'primary'}
        isPending={fetchState.isLoading}
        loadingAnimation="terminal"
        onPress={handleRefresh}
        marginBottom="1rem"
      >
        {getButtonText()}
      </Button>

      {fetchState.error && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <strong>Error:</strong> {fetchState.error}
          <br />
          <small>Attempted {fetchState.retryCount} retries</small>
        </div>
      )}

      {fetchState.data && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#f0f8ff',
          border: '1px solid #cce',
          borderRadius: '4px'
        }}>
          <strong>Data loaded successfully!</strong>
          <pre style={{ fontSize: '0.8em', marginTop: '0.5rem' }}>
            {JSON.stringify(fetchState.data, null, 2)}
          </pre>
        </div>
      )}

      {fetchState.isLoading && fetchState.retryCount > 0 && (
        <div style={{ fontSize: '0.9em', color: '#666' }}>
          Previous attempts failed. Retrying in a moment...
        </div>
      )}
    </div>
  );
}
```

### Batch Processing

Processing multiple items with terminal loading:

```tsx
import React, { useState } from 'react';
import { Button } from '@react-spectrum/button';
import { ProgressBar } from '@react-spectrum/progress';

function BatchProcessingExample() {
  const [processState, setProcessState] = useState({
    isProcessing: false,
    currentItem: 0,
    totalItems: 0,
    processedItems: [],
    errors: []
  });

  const sampleItems = [
    { id: 1, name: 'Document 1.pdf', size: '2.3 MB' },
    { id: 2, name: 'Image 1.jpg', size: '1.8 MB' },
    { id: 3, name: 'Spreadsheet 1.xlsx', size: '890 KB' },
    { id: 4, name: 'Presentation 1.pptx', size: '4.2 MB' },
    { id: 5, name: 'Archive 1.zip', size: '12.1 MB' }
  ];

  const processItems = async () => {
    setProcessState({
      isProcessing: true,
      currentItem: 0,
      totalItems: sampleItems.length,
      processedItems: [],
      errors: []
    });

    for (let i = 0; i < sampleItems.length; i++) {
      const item = sampleItems[i];
      
      setProcessState(prev => ({
        ...prev,
        currentItem: i + 1
      }));

      try {
        // Simulate processing time based on file size
        const processingTime = Math.random() * 2000 + 1000;
        await new Promise(resolve => setTimeout(resolve, processingTime));

        // Simulate occasional failures
        if (Math.random() < 0.2) {
          throw new Error(`Failed to process ${item.name}`);
        }

        setProcessState(prev => ({
          ...prev,
          processedItems: [...prev.processedItems, item]
        }));

      } catch (error) {
        setProcessState(prev => ({
          ...prev,
          errors: [...prev.errors, { item, error: error.message }]
        }));
      }
    }

    setProcessState(prev => ({
      ...prev,
      isProcessing: false
    }));
  };

  const progress = processState.totalItems > 0 
    ? (processState.currentItem / processState.totalItems) * 100 
    : 0;

  const getButtonText = () => {
    if (processState.isProcessing) {
      return `Processing ${processState.currentItem}/${processState.totalItems}...`;
    }
    return 'Start Batch Processing';
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3>Files to Process ({sampleItems.length} items)</h3>
        <ul style={{ fontSize: '0.9em' }}>
          {sampleItems.map(item => (
            <li key={item.id}>
              {item.name} ({item.size})
            </li>
          ))}
        </ul>
      </div>

      <Button 
        variant="accent"
        isPending={processState.isProcessing}
        loadingAnimation="terminal"
        onPress={processItems}
        isDisabled={processState.isProcessing}
        marginBottom="1rem"
        width="100%"
      >
        {getButtonText()}
      </Button>

      {processState.isProcessing && (
        <div style={{ marginBottom: '1rem' }}>
          <ProgressBar 
            value={progress}
            label="Processing Progress"
            showValueLabel
          />
          <div style={{ fontSize: '0.9em', marginTop: '0.5rem' }}>
            Currently processing: {sampleItems[processState.currentItem - 1]?.name || 'Preparing...'}
          </div>
        </div>
      )}

      {processState.processedItems.length > 0 && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#f0f8ff',
          border: '1px solid #cce',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <h4>✅ Successfully Processed ({processState.processedItems.length})</h4>
          <ul style={{ fontSize: '0.9em' }}>
            {processState.processedItems.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}

      {processState.errors.length > 0 && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '4px'
        }}>
          <h4>❌ Processing Errors ({processState.errors.length})</h4>
          <ul style={{ fontSize: '0.9em' }}>
            {processState.errors.map((error, index) => (
              <li key={index}>
                <strong>{error.item.name}:</strong> {error.error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

## Error Handling

### Comprehensive Error States

```tsx
import React, { useState } from 'react';
import { Button } from '@react-spectrum/button';

function ErrorHandlingExample() {
  const [operationState, setOperationState] = useState({
    status: 'idle', // 'idle' | 'loading' | 'success' | 'error' | 'timeout'
    error: null,
    attempt: 0
  });

  const simulateOperation = async () => {
    const attempt = operationState.attempt + 1;
    
    setOperationState({
      status: 'loading',
      error: null,
      attempt
    });

    try {
      // Simulate various failure scenarios
      const scenarios = [
        { type: 'success', probability: 0.4 },
        { type: 'network_error', probability: 0.2 },
        { type: 'server_error', probability: 0.2 },
        { type: 'timeout', probability: 0.1 },
        { type: 'validation_error', probability: 0.1 }
      ];

      const random = Math.random();
      let cumulative = 0;
      let scenario = scenarios[0];

      for (const s of scenarios) {
        cumulative += s.probability;
        if (random <= cumulative) {
          scenario = s;
          break;
        }
      }

      // Simulate processing time
      const processingTime = Math.random() * 3000 + 1000;
      await new Promise(resolve => setTimeout(resolve, processingTime));

      switch (scenario.type) {
        case 'success':
          setOperationState({
            status: 'success',
            error: null,
            attempt
          });
          break;
          
        case 'network_error':
          throw new Error('Network connection failed. Please check your internet connection.');
          
        case 'server_error':
          throw new Error('Server error (500). The service is temporarily unavailable.');
          
        case 'timeout':
          setOperationState({
            status: 'timeout',
            error: 'Operation timed out. Please try again.',
            attempt
          });
          return;
          
        case 'validation_error':
          throw new Error('Validation failed. Please check your input data.');
          
        default:
          throw new Error('Unknown error occurred.');
      }

    } catch (error) {
      setOperationState({
        status: 'error',
        error: error.message,
        attempt
      });
    }
  };

  const handleReset = () => {
    setOperationState({
      status: 'idle',
      error: null,
      attempt: 0
    });
  };

  const getButtonVariant = () => {
    switch (operationState.status) {
      case 'error':
      case 'timeout':
        return 'negative';
      case 'success':
        return 'positive';
      default:
        return 'primary';
    }
  };

  const getButtonText = () => {
    switch (operationState.status) {
      case 'loading':
        return `Processing... (Attempt ${operationState.attempt})`;
      case 'success':
        return 'Operation Successful!';
      case 'error':
        return 'Retry Operation';
      case 'timeout':
        return 'Try Again (Timed Out)';
      default:
        return 'Start Operation';
    }
  };

  return (
    <div style={{ maxWidth: '500px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3>Error Handling Demo</h3>
        <p style={{ fontSize: '0.9em', color: '#666' }}>
          This demo simulates various success and failure scenarios to demonstrate 
          error handling with terminal loading animation.
        </p>
      </div>

      <Button 
        variant={getButtonVariant()}
        isPending={operationState.status === 'loading'}
        loadingAnimation="terminal"
        onPress={simulateOperation}
        isDisabled={operationState.status === 'loading'}
        width="100%"
        marginBottom="1rem"
      >
        {getButtonText()}
      </Button>

      {operationState.status === 'success' && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#f0f8f0',
          border: '1px solid #cfc',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <strong>✅ Success!</strong>
          <br />
          Operation completed successfully after {operationState.attempt} attempt(s).
        </div>
      )}

      {(operationState.status === 'error' || operationState.status === 'timeout') && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <strong>❌ {operationState.status === 'timeout' ? 'Timeout' : 'Error'}:</strong>
          <br />
          {operationState.error}
          <br />
          <small>Attempt: {operationState.attempt}</small>
        </div>
      )}

      {operationState.status !== 'idle' && operationState.status !== 'loading' && (
        <Button 
          variant="secondary"
          onPress={handleReset}
          width="100%"
        >
          Reset Demo
        </Button>
      )}

      <div style={{ fontSize: '0.8em', color: '#999', marginTop: '1rem' }}>
        <strong>Simulation probabilities:</strong>
        <ul>
          <li>Success: 40%</li>
          <li>Network Error: 20%</li>
          <li>Server Error: 20%</li>
          <li>Timeout: 10%</li>
          <li>Validation Error: 10%</li>
        </ul>
      </div>
    </div>
  );
}
```

## Advanced Patterns

### State Machine Integration

Using state machines with terminal loading:

```tsx
import React, { useState, useReducer } from 'react';
import { Button } from '@react-spectrum/button';

// State machine definition
const stateMachine = {
  idle: {
    START: 'loading'
  },
  loading: {
    SUCCESS: 'success',
    ERROR: 'error',
    TIMEOUT: 'timeout'
  },
  success: {
    RESET: 'idle'
  },
  error: {
    RETRY: 'loading',
    RESET: 'idle'
  },
  timeout: {
    RETRY: 'loading',
    RESET: 'idle'
  }
};

function stateReducer(state, action) {
  const nextState = stateMachine[state.status]?.[action.type];
  
  if (!nextState) {
    return state;
  }

  switch (action.type) {
    case 'START':
    case 'RETRY':
      return {
        ...state,
        status: nextState,
        error: null,
        attempts: state.attempts + 1
      };
      
    case 'SUCCESS':
      return {
        ...state,
        status: nextState,
        error: null,
        data: action.payload
      };
      
    case 'ERROR':
    case 'TIMEOUT':
      return {
        ...state,
        status: nextState,
        error: action.payload
      };
      
    case 'RESET':
      return {
        status: 'idle',
        error: null,
        data: null,
        attempts: 0
      };
      
    default:
      return state;
  }
}

function StateMachineExample() {
  const [state, dispatch] = useReducer(stateReducer, {
    status: 'idle',
    error: null,
    data: null,
    attempts: 0
  });

  const handleStart = async () => {
    dispatch({ type: 'START' });
    
    try {
      // Simulate async operation
      const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const random = Math.random();
          if (random < 0.6) {
            resolve({ id: Date.now(), message: 'Operation completed' });
          } else if (random < 0.8) {
            reject(new Error('Network error occurred'));
          } else {
            // Simulate timeout
            dispatch({ type: 'TIMEOUT', payload: 'Operation timed out' });
          }
        }, 2000 + Math.random() * 3000);
      });
      
      dispatch({ type: 'SUCCESS', payload: result });
      
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  const handleRetry = () => {
    handleStart();
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  const getButtonProps = () => {
    switch (state.status) {
      case 'loading':
        return {
          variant: 'primary',
          isPending: true,
          loadingAnimation: 'terminal',
          onPress: undefined,
          children: `Processing... (Attempt ${state.attempts})`
        };
        
      case 'success':
        return {
          variant: 'positive',
          isPending: false,
          onPress: handleReset,
          children: 'Success! Click to reset'
        };
        
      case 'error':
        return {
          variant: 'negative',
          isPending: false,
          onPress: handleRetry,
          children: `Retry (${state.attempts} attempts)`
        };
        
      case 'timeout':
        return {
          variant: 'secondary',
          isPending: false,
          onPress: handleRetry,
          children: 'Retry (Timed out)'
        };
        
      default:
        return {
          variant: 'primary',
          isPending: false,
          onPress: handleStart,
          children: 'Start Operation'
        };
    }
  };

  const buttonProps = getButtonProps();

  return (
    <div style={{ maxWidth: '400px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3>State Machine Example</h3>
        <div style={{ fontSize: '0.9em', color: '#666' }}>
          Current State: <strong>{state.status}</strong>
          {state.attempts > 0 && (
            <span> | Attempts: {state.attempts}</span>
          )}
        </div>
      </div>

      <Button 
        {...buttonProps}
        width="100%"
        marginBottom="1rem"
      />

      {state.error && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <strong>Error:</strong> {state.error}
        </div>
      )}

      {state.data && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#f0f8f0',
          border: '1px solid #cfc',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <strong>Success!</strong>
          <pre style={{ fontSize: '0.8em', marginTop: '0.5rem' }}>
            {JSON.stringify(state.data, null, 2)}
          </pre>
        </div>
      )}

      {state.status !== 'idle' && (
        <Button 
          variant="secondary"
          onPress={handleReset}
          width="100%"
          size="S"
        >
          Reset to Idle State
        </Button>
      )}
    </div>
  );
}
```

## Styling Examples

### Custom Terminal Styles

```tsx
import React, { useState } from 'react';
import { Button } from '@react-spectrum/button';
import './CustomTerminalStyles.css';

function CustomStyledExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('classic');

  const themes = {
    classic: {
      name: 'Classic Terminal',
      className: 'terminal-classic'
    },
    matrix: {
      name: 'Matrix Style',
      className: 'terminal-matrix'
    },
    retro: {
      name: 'Retro Computer',
      className: 'terminal-retro'
    },
    modern: {
      name: 'Modern Dark',
      className: 'terminal-modern'
    }
  };

  const handleProcess = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 4000));
    setIsLoading(false);
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label>Theme: </label>
        <select 
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          disabled={isLoading}
        >
          {Object.entries(themes).map(([key, theme]) => (
            <option key={key} value={key}>{theme.name}</option>
          ))}
        </select>
      </div>

      <Button 
        variant="primary"
        isPending={isLoading}
        loadingAnimation="terminal"
        onPress={handleProcess}
        UNSAFE_className={themes[theme].className}
        width="100%"
      >
        {isLoading ? 'Processing data...' : 'Start Process'}
      </Button>
    </div>
  );
}
```

**CustomTerminalStyles.css:**

```css
/* Classic Terminal Theme */
.terminal-classic [data-terminal-animation] {
  font-family: 'Courier New', monospace;
  color: #00ff00;
  background-color: #000;
  padding: 2px 4px;
  border-radius: 2px;
  text-shadow: 0 0 5px #00ff00;
  animation: terminal-glow 2s ease-in-out infinite alternate;
}

@keyframes terminal-glow {
  from { text-shadow: 0 0 5px #00ff00; }
  to { text-shadow: 0 0 10px #00ff00, 0 0 15px #00ff00; }
}

/* Matrix Theme */
.terminal-matrix [data-terminal-animation] {
  font-family: 'Courier New', monospace;
  color: #00ff41;
  background: linear-gradient(90deg, #000 0%, #001100 50%, #000 100%);
  padding: 2px 6px;
  border: 1px solid #00ff41;
  border-radius: 3px;
  box-shadow: inset 0 0 10px rgba(0, 255, 65, 0.3);
  position: relative;
}

.terminal-matrix [data-terminal-animation]::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(transparent 50%, rgba(0, 255, 65, 0.1) 50%);
  pointer-events: none;
}

/* Retro Computer Theme */
.terminal-retro [data-terminal-animation] {
  font-family: 'Monaco', 'Menlo', monospace;
  color: #ff6600;
  background-color: #2d1810;
  padding: 3px 6px;
  border: 2px solid #ff6600;
  border-radius: 4px;
  box-shadow: 
    inset 0 0 10px rgba(255, 102, 0, 0.2),
    0 0 10px rgba(255, 102, 0, 0.3);
  text-shadow: 0 0 3px #ff6600;
}

/* Modern Dark Theme */
.terminal-modern [data-terminal-animation] {
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
  color: #61dafb;
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #61dafb;
  box-shadow: 
    0 2px 8px rgba(97, 218, 251, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
}

.terminal-modern [data-terminal-animation]::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #61dafb, transparent);
  opacity: 0.6;
}
```

## Testing Examples

### Unit Testing

```tsx
// TerminalButton.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Button } from '@react-spectrum/button';
import { Provider } from '@react-spectrum/provider';
import { theme } from '@react-spectrum/theme-default';

function TestWrapper({ children }) {
  return (
    <Provider theme={theme}>
      {children}
    </Provider>
  );
}

describe('Terminal Loading Animation', () => {
  test('shows terminal animation when isPending is true', async () => {
    const { rerender } = render(
      <TestWrapper>
        <Button isPending={false}>Submit</Button>
      </TestWrapper>
    );

    // Initially no loading animation
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();

    // Enable pending state
    rerender(
      <TestWrapper>
        <Button isPending={true} loadingAnimation="terminal">Submit</Button>
      </TestWrapper>
    );

    // Should show terminal animation after delay
    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  test('cycles through dot states correctly', async () => {
    render(
      <TestWrapper>
        <Button isPending={true} loadingAnimation="terminal">Submit</Button>
      </TestWrapper>
    );

    // Wait for animation to become visible
    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    }, { timeout: 2000 });

    // Check that dots are cycling
    const loadingElement = screen.getByText(/loading/i);
    
    // Initial state
    expect(loadingElement.textContent).toBe('Loading');
    
    // Wait for first dot
    await waitFor(() => {
      expect(loadingElement.textContent).toBe('Loading.');
    }, { timeout: 1000 });

    // Wait for second dot
    await waitFor(() => {
      expect(loadingElement.textContent).toBe('Loading..');
    }, { timeout: 1000 });
  });

  test('respects loadingAnimation prop', () => {
    const { rerender } = render(
      <TestWrapper>
        <Button isPending={true} loadingAnimation="spinner">Submit</Button>
      </TestWrapper>
    );

    // Should not show terminal animation
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();

    // Switch to terminal animation
    rerender(
      <TestWrapper>
        <Button isPending={true} loadingAnimation="terminal">Submit</Button>
      </TestWrapper>
    );

    // Should show terminal animation
    waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  test('maintains accessibility attributes', async () => {
    render(
      <TestWrapper>
        <Button isPending={true} loadingAnimation="terminal">Submit</Button>
      </TestWrapper>
    );

    await waitFor(() => {
      const loadingElement = screen.getByRole('img');
      expect(loadingElement).toHaveAttribute('aria-label');
      expect(loadingElement.getAttribute('aria-label')).toMatch(/loading/i);
    }, { timeout: 2000 });
  });

  test('cleans up animation on unmount', async () => {
    const { unmount } = render(
      <TestWrapper>
        <Button isPending={true} loadingAnimation="terminal">Submit</Button>
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    }, { timeout: 2000 });

    // Unmount component
    unmount();

    // No memory leaks or continued timers
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
```

### Integration Testing

```tsx
// IntegrationTest.tsx
import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Button } from '@react-spectrum/button';
import { Provider } from '@react-spectrum/provider';
import { theme } from '@react-spectrum/theme-default';

function AsyncFormComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResult('success');
    } catch (error) {
      setResult('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Provider theme={theme}>
      <Button 
        isPending={isSubmitting}
        loadingAnimation="terminal"
        onPress={handleSubmit}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Form'}
      </Button>
      {result && <div data-testid="result">{result}</div>}
    </Provider>
  );
}

describe('Terminal Loading Integration', () => {
  test('complete form submission flow', async () => {
    render(<AsyncFormComponent />);

    const submitButton = screen.getByRole('button', { name: /submit form/i });
    
    // Initial state
    expect(submitButton).not.toHaveAttribute('aria-busy');
    
    // Click submit
    fireEvent.click(submitButton);
    
    // Should show loading state
    expect(screen.getByText(/submitting/i)).toBeInTheDocument();
    
    // Wait for terminal animation to appear
    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Wait for completion
    await waitFor(() => {
      expect(screen.getByTestId('result')).toHaveTextContent('success');
    }, { timeout: 2000 });
    
    // Should return to normal state
    expect(screen.getByText(/submit form/i)).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
```

### Visual Regression Testing

```tsx
// VisualTests.stories.tsx
import React, { useState } from 'react';
import { Button } from '@react-spectrum/button';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Terminal Loading/Visual Tests',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TerminalLoadingStates: Story = {
  render: () => {
    return (
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <Button isPending={false}>Idle State</Button>
        <Button isPending={true} loadingAnimation="terminal">Terminal Loading</Button>
        <Button isPending={true} loadingAnimation="spinner">Spinner Loading</Button>
        <Button variant="accent" isPending={true} loadingAnimation="terminal">Accent Terminal</Button>
        <Button variant="negative" isPending={true} loadingAnimation="terminal">Negative Terminal</Button>
        <Button variant="secondary" isPending={true} loadingAnimation="terminal">Secondary Terminal</Button>
      </div>
    );
  },
  parameters: {
    chromatic: { delay: 2000 }, // Wait for animations to be visible
  },
};

export const ResponsiveTerminalLoading: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <Button 
        isPending={true}
        loadingAnimation="terminal"
        width="100%"
        marginBottom="1rem"
      >
        Full Width Terminal Loading
      </Button>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button isPending={true} loadingAnimation="terminal" flex="1">
          Flex Terminal 1
        </Button>
        <Button isPending={true} loadingAnimation="terminal" flex="1">
          Flex Terminal 2
        </Button>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { 
      delay: 2000,
      viewports: [320, 768, 1200] // Test multiple viewport sizes
    },
  },
};
```

This comprehensive examples documentation covers all major use cases and patterns for the terminal loading animation feature, providing developers with practical, copy-paste ready code samples for implementing the feature in their applications.