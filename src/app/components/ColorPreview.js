import { useEffect } from 'react';

function ColorPreview() {
    useEffect(() => {

        const selectElement = document.getElementById('importance-selector');
        const previewDiv = document.getElementById('select-color-preview');

        selectElement.addEventListener('change', function() {
            const selectedValue = this.value;

            switch (selectedValue) {
                case 'low':
                    previewDiv.style.backgroundColor = '#90be6d';
                break;
                case 'medium':
                    previewDiv.style.backgroundColor = '#f9c74f';
                break;
                case 'high':
                    previewDiv.style.backgroundColor = '#f9844a';
                break;
                case 'critical':
                    previewDiv.style.backgroundColor = '#f94144';
                break;
                case 'idea':
                    previewDiv.style.backgroundColor = '#ff8fab';
                break;
                case 'note':
                    previewDiv.style.backgroundColor = '#2ec4b6';
                break;
                case 'reminder':
                    previewDiv.style.backgroundColor = '#8ecae6';
                break;
                default:
                    previewDiv.style.backgroundColor = '#8e7dbe';
                break;
            }
        });

        return () => {
            selectElement.removeEventListener('change', handleSelectChange);
        };
    }, []);

    return (
        <div id='select-color-preview'>
            {}
        </div>
    );
}

export default ColorPreview;
